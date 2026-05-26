import { useState, useRef, useCallback } from "react";
import { Camera, Upload, ArrowLeft, Loader2, Maximize2, Utensils, ArrowDownToLine } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import api from "@/lib/api";
import BackgroundIcons from "@/components/BackgroundIcons";

const mealTypes = [
  { value: "Café da manhã", label: "Café da manhã" },
  { value: "Almoço", label: "Almoço" },
  { value: "Jantar", label: "Jantar" },
  { value: "Lanche", label: "Lanche" },
  { value: "Outro", label: "Outro" },
];


const UploadMeal = () => {
  const navigate = useNavigate();
  const [selectedMeal, setSelectedMeal] = useState("Almoço");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setIsDragging(false), []);

  const handleAnalyze = async () => {
    if (!file || isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', selectedMeal);
    formData.append('date', `${format(date, 'yyyy-MM-dd')}T${time}:00.000Z`);

    try {
      const response = await api.post('/meal/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/dashboard/revisao', { 
        state: { 
          items: response.data.items,
          photoUrl: response.data.photoUrl,
          name: selectedMeal,
          date: `${format(date, 'yyyy-MM-dd')}T${time}:00.000Z`,
          imagePreview: `data:image/jpeg;base64,${response.data.annotatedImage}` 
        }  
      });
    } catch (error) {
      alert('Erro ao analisar refeição!');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        <BackgroundIcons />
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <SidebarTrigger />
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Registrar Refeição
            </h1>
          </div>

          <div className="max-w-xl mx-auto space-y-6">
            {/* Meal Type */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Tipo de refeição</label>
                <div className="flex flex-wrap gap-2">
                  {mealTypes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setSelectedMeal(t.value)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
                        selectedMeal === t.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-secondary-foreground border-border hover:bg-muted"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Data</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(date, "dd 'de' MMMM, yyyy", { locale: ptBR })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => d && setDate(d)}
                        disabled={(d) => d > new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Hora</label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Photo Upload */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <label className="text-sm font-medium text-muted-foreground">Foto do prato</label>

                {/* Tips */}
                <div className="rounded-lg border border-primary/10 bg-primary/[0.03] p-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center text-center gap-1.5">
                      <Maximize2 className="h-4 w-4 text-primary shrink-0" />
                      <p className="text-xs font-semibold text-foreground leading-tight">Enquadre o prato</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">Preencha a maior parte da foto</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1.5">
                      <Utensils className="h-4 w-4 text-primary shrink-0" />
                      <p className="text-xs font-semibold text-foreground leading-tight">Separe os alimentos</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">Evite empilhar ou sobrepor</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1.5">
                      <ArrowDownToLine className="h-4 w-4 text-primary shrink-0" />
                      <p className="text-xs font-semibold text-foreground leading-tight">Fotografe de cima</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">Vista superior, boa luz</p>
                    </div>
                  </div>
                </div>

                <div
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-colors min-h-[200px]",
                    isDragging
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-muted/50",
                    image && "border-solid border-primary/30"
                  )}
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Prato"
                      className="w-full h-56 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-8 text-muted-foreground">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                        <Camera className="h-7 w-7 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">
                          Arraste uma foto ou clique para enviar
                        </p>
                        <p className="text-xs mt-1">PNG, JPG até 10MB</p>
                      </div>
                      <Upload className="h-4 w-4" />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                    }}
                  />
                </div>
                {image && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setImage(null); }}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Remover foto
                  </button>
                )}
              </CardContent>
            </Card>


            {/* Submit */}
            <Button
              className="w-full h-12 text-base font-heading font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(145_72%_45%/0.3)] rounded-xl"
              size="lg"
              onClick={handleAnalyze}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analisando...
                </span>
              ) : (
                "Analisar Refeição"
              )}
            </Button>
          </div>
        </main>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6 text-center p-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-heading font-bold text-foreground">
                  Analisando sua refeição...
                </h2>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Estamos processando a imagem e calculando os macros. Isso pode levar alguns segundos.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};

export default UploadMeal;
