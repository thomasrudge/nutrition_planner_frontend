import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Trash2, AlertTriangle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BackgroundIcons from "@/components/BackgroundIcons";
import api from "@/lib/api";
import { toast } from "sonner";

const activityLevels = [
  { value: "sedentary", label: "Sedentário" },
  { value: "lightly active", label: "Levemente ativo" },
  { value: "moderately active", label: "Moderadamente ativo" },
  { value: "very active", label: "Muito ativo" },
];

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user-goal");
        const data = response.data;
        setHeight(String(data.height || ""));
        setWeight(String(data.weight || ""));
        setGender(data.gender || "");
        setActivityLevel(data.activityLevel || "");


      } catch {
        // silently fail — fields stay empty
      }

      try {
        const token = localStorage.getItem("token");
        if (token) {
        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub;
        const UserResponse = await api.get(`/users/${userId}`);
        console.log("User data:", UserResponse.data);
        console.log('name:', UserResponse.data.name, 'email:', UserResponse.data.email);
        setName(String(UserResponse.data.name))
        setEmail(String(UserResponse.data.email))
        }
      } catch {
        // token parse failed
      }

      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch("/user-goal", {
        height: Number(height),
        weight: Number(weight),
        gender,
        activityLevel,
      });

      const newGoals = await api.patch("/user-goal", {
        height: Number(height),
        weight: Number(weight),
        gender,
        activityLevel,
      });

      console.log("Updated goals:", newGoals.data);
      toast.success("Dados atualizados com sucesso!");
    } catch {
      toast.error("Erro ao salvar dados.");
    }
    setSaving(false);
  };

  const handleDeleteAccount = async () => {
    if (confirmDeleteText !== "DELETAR") return;
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.sub;

      await api.delete(`/users/${userId}`);
      localStorage.removeItem("token");
      toast.success("Conta deletada.");
      navigate("/");
    } catch {
      toast.error("Erro ao deletar conta.");
    }
    setDeleting(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        <BackgroundIcons />
        <AppSidebar />
        <div className="flex-1 flex flex-col relative z-10">
          <header className="h-14 flex items-center border-b border-border px-4 gap-4">
            <SidebarTrigger />
            <h1 className="font-heading font-bold text-foreground">Configurações</h1>
          </header>

          <main className="flex-1 p-6 space-y-6 overflow-auto">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Seu Perfil</h2>
              <p className="text-muted-foreground text-sm mt-1">Visualize e edite suas informações pessoais.</p>
            </div>

            {loading ? (
              <p className="text-muted-foreground text-sm">Carregando...</p>
            ) : (
              <>
                {/* Account Info (read-only) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Conta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Nome</Label>
                        <Input value={name} disabled className="bg-muted/50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Email</Label>
                        <Input value={email} disabled className="bg-muted/50" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Editable body data */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Dados Físicos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Altura (cm)</Label>
                        <Input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="175"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Peso (kg)</Label>
                        <Input
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="70"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Sexo</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Masculino</SelectItem>
                            <SelectItem value="female">Feminino</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Nível de Atividade</Label>
                        <Select value={activityLevel} onValueChange={setActivityLevel}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {activityLevels.map((l) => (
                              <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive/30">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-destructive">Zona de Perigo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ao deletar sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
                    </p>
                    <Dialog open={deleteDialogOpen} onOpenChange={(open) => { setDeleteDialogOpen(open); setConfirmDeleteText(""); }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Deletar Conta
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="h-5 w-5" />
                            Deletar conta permanentemente
                          </DialogTitle>
                          <DialogDescription className="pt-2">
                            Esta ação é <strong>irreversível</strong>. Todas as suas refeições, metas e dados pessoais serão permanentemente apagados.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2 py-2">
                          <Label className="text-sm text-muted-foreground">
                            Digite <span className="font-bold text-foreground">DELETAR</span> para confirmar:
                          </Label>
                          <Input
                            value={confirmDeleteText}
                            onChange={(e) => setConfirmDeleteText(e.target.value)}
                            placeholder="DELETAR"
                            className="font-mono"
                          />
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button
                            variant="destructive"
                            disabled={confirmDeleteText !== "DELETAR" || deleting}
                            onClick={handleDeleteAccount}
                          >
                            {deleting ? "Deletando..." : "Confirmar Exclusão"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
