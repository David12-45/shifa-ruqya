export type CategoryId =
  | 'heart-grief'
  | 'confidence-boundaries'
  | 'mind-focus'
  | 'willpower-habits'
  | 'rizq-tatyl'
  | 'ibadah-steadiness'
  | 'body-health-sport'
  | 'hidden-shield';

export type DifficultyLevel = 'Начальный' | 'Средний' | 'Глубокий';

export type SessionFormat =
  | 'Экспресс до 15 мин'
  | 'Глубокий сеанс 45 мин'
  | 'На ночь';

export type AppView =
  | 'home'
  | 'catalog'
  | 'protocol'
  | 'packs'
  | 'diagnostic'
  | 'tracker'
  | 'handbook';

export interface CategoryInfo {
  id: CategoryId;
  number: number;
  titleRu: string;
  subtitleEn: string;
  arabicTerm: string;
  transliteration: string;
  description: string;
  iconName:
    | 'HeartHandshake'
    | 'ShieldCheck'
    | 'Brain'
    | 'Flame'
    | 'Coins'
    | 'Sparkles'
    | 'Activity'
    | 'Home';
}

export interface AudioSession {
  id: string;
  reciter: string;
  reciterArabic: string;
  title: string;
  duration: string;
  format: SessionFormat;
  youtubeUrl: string;
  focusNote: string;
}

export interface QuranicPrescription {
  id: string;
  surahRef: string;
  arabicText: string;
  transcriptionRu: string;
  translationRu: string;
  recitationInstruction: string;
  repeatCount: string;
}

export interface CarrierProtocol {
  waterInstructions: string;
  oilInstructions: string;
  keySurahs: string[];
  notes: string;
}

export interface ConditionSummary {
  id: number;
  slug: string;
  categoryId: CategoryId;
  titleRu: string;
  arabicTerm: string;
  transliteration: string;
  hookRu: string;
  difficulty: DifficultyLevel;
  sessionFormat: SessionFormat;
  keywords: string[];
  isDetailed: boolean;
}

export interface ProtocolDetail extends ConditionSummary {
  symptoms: string[];
  spiritualMechanics: string;
  psychosomaticMechanics: string;
  audioSessions: AudioSession[];
  prescriptions: QuranicPrescription[];
  carrierProtocol: CarrierProtocol;
  expectedReactions: string[];
  ethicsNote: string;
  physicalMicroAction: string;
}

export interface PackTimelinePhase {
  dayRange: string;
  phaseTitle: string;
  goal: string;
  dailyAudioTitle: string;
  dailyAudioReciter: string;
  dailyAudioUrl: string;
  dhikrTarget: string;
  microAction: string;
}

export interface MultiDayPack {
  id: string;
  number: number;
  title: string;
  durationDays: number;
  subtitle: string;
  arabicBadge: string;
  targetAudience: string;
  linkedConditionIds: number[];
  timeline: PackTimelinePhase[];
}

export interface DiagnosticAnswers {
  lifeSphere: CategoryId | '';
  onsetType: 'sudden' | 'chronic' | 'cyclical' | '';
  keyTrigger:
    | 'chest-grief'
    | 'throat-freeze'
    | 'brain-fog'
    | 'dopamine-loop'
    | 'blocked-doors'
    | 'prayer-heaviness'
    | 'body-pain'
    | 'night-pressure'
    | '';
  quranReaction: 'calm' | 'yawning-sleep' | 'irritation' | 'tingling-tears' | '';
  dailyTime: '15min' | '45min' | '';
}

export interface SavedDiagnosticResult {
  completedAt: string;
  answers: DiagnosticAnswers;
  recommendedConditionIds: number[];
  recommendedPackId: string;
  summaryTitle: string;
  summaryText: string;
  dailyPlan: string[];
}

export interface TrackerDayEntry {
  day: number;
  morningAdhkar: boolean;
  eveningAdhkar: boolean;
  targetedRuqya: boolean;
  waterAndOil: boolean;
  baqarahHome: boolean;
  microAction: boolean;
  symptomTags: string[];
  note: string;
}

export interface TrackerState {
  currentDay: number;
  activePackId: string | null;
  activePackTitle: string | null;
  days: Record<number, TrackerDayEntry>;
}
