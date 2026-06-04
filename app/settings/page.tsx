"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, User, Thermometer, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
  }, []);

  async function handleLogOut() {
    setLoggingOut(true);
    await signOut();
    router.push("/sign-up");
  }

  function handleDeleteAccount() {
    toast("Slet konto er ikke implementeret i denne prototype.");
  }

  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Indstillinger</h1>

      <div className="space-y-6">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
            <User className="h-4 w-4" />
            Konto
          </div>
          <Card>
            <CardContent className="divide-y p-0">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">E-mail</p>
                  <p className="mt-0.5 text-sm text-gray-500">{email || "—"}</p>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Adgangskode</p>
                  <p className="mt-0.5 text-sm text-gray-500">Skift din adgangskode</p>
                </div>
                <Button variant="outline" size="sm">Skift</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
            <Thermometer className="h-4 w-4" />
            Visning
          </div>
          <Card>
            <CardContent className="px-5 py-4">
              <p className="text-sm font-medium text-gray-700">Temperaturenhed</p>
              <p className="mt-0.5 text-xs text-gray-400">Vælg hvilken enhed temperaturer vises i</p>
              <div className="mt-3 flex gap-2">
                {(["C", "F"] as const).map((unit) => (
                  <Button
                    key={unit}
                    variant={tempUnit === unit ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTempUnit(unit)}
                    className="w-16"
                  >
                    °{unit}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-400">Farezone</p>
          <Card className="border-red-100">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Log ud</p>
                  <p className="mt-0.5 text-xs text-gray-500">Afslut din session. Du skal logge ind igen for at få adgang.</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                  onClick={handleLogOut}
                  disabled={loggingOut}
                >
                  <LogOut className="h-4 w-4" />
                  {loggingOut ? "Logger ud..." : "Log ud"}
                </Button>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Slet konto</p>
                  <p className="mt-0.5 text-xs text-gray-500">Permanent sletning af din konto og alle data.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-red-200 text-red-600 hover:bg-red-50"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="h-4 w-4" />
                  Slet konto
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

