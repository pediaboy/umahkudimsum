import { NextResponse } from "next/server";
import { serverClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Body = {
  name?: string;
  phone?: string;
  guests?: number;
  reserve_date?: string;
  reserve_time?: string;
  notes?: string;
};

function clean(v: unknown, max = 500) {
  return String(v ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Format permintaan tidak valid." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const notes = clean(body.notes, 600);

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Nama dan nomor WhatsApp wajib diisi." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ ok: false, error: "Nomor WhatsApp tidak valid." }, { status: 400 });
  }

  const guestsRaw = Number(body.guests ?? 2);
  const guests = Number.isFinite(guestsRaw) ? Math.min(Math.max(Math.trunc(guestsRaw), 1), 60) : 2;

  const db = serverClient();
  if (!db) {
    return NextResponse.json({ ok: false, error: "Layanan reservasi belum dikonfigurasi." }, { status: 503 });
  }

  const { error } = await db.from("uk_reservations").insert({
    name,
    phone,
    guests,
    reserve_date: clean(body.reserve_date, 20) || null,
    reserve_time: clean(body.reserve_time, 12) || null,
    notes: notes || null,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ ok: false, error: "Gagal menyimpan reservasi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
