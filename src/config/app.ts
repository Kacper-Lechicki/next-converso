import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';

import { Subject } from '@/types';

export const SUBJECTS: Subject[] = [
  'maths',
  'language',
  'science',
  'history',
  'coding',
  'economics',
];

export const SUBJECTS_COLORS = {
  science: '#E5D0FF',
  maths: '#FFDA6E',
  language: '#BDE7FF',
  coding: '#FFC8E4',
  history: '#FFECC8',
  economics: '#C8FFDF',
};

export const VOICES = {
  male: { casual: '2BJW5coyhAzSr8STdHbE', formal: 'c6SfcYrb2t09NHXiT80T' },
  female: { casual: 'ZIlrSGI4jZqobxRKprJz', formal: 'sarah' },
} as const;

export const DEFAULT_VOICE = 'female' as const;
export const DEFAULT_STYLE = 'formal' as const;

export const configureAssistant = (voice: string, style: string) => {
  const voiceId =
    VOICES[voice as keyof typeof VOICES][
      style as keyof (typeof VOICES)[keyof typeof VOICES]
    ] || 'sarah';

  const vapiAssistant: CreateAssistantDTO = {
    name: 'Companion',
    firstMessage:
      "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: 'deepgram',
      model: 'nova-3',
      language: 'en',
    },
    voice: {
      provider: '11labs',
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: 'openai',
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.
    
                      Tutor Guidelines:
                      Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                      Keep the conversation flowing smoothly while maintaining control.
                      From time to time make sure that the student is following you and understands you.
                      Break down the topic into smaller parts and teach the student one part at a time.
                      Keep your style of conversation {{ style }}.
                      Keep your responses short, like in a real voice conversation.
                      Do not include any special characters in your responses - this is a voice conversation.
                `,
        },
      ],
    },
    clientMessages: undefined,
    serverMessages: undefined,
  };

  return vapiAssistant;
};

export const COMPANION_PAGE_DOTS = [
  { color: SUBJECTS_COLORS.maths, size: 'w-6 h-6', top: '10%', left: '15%' },
  {
    color: SUBJECTS_COLORS.science,
    size: 'w-8 h-8',
    top: '25%',
    left: '85%',
  },
  {
    color: SUBJECTS_COLORS.language,
    size: 'w-4 h-4',
    top: '15%',
    left: '45%',
  },
  { color: SUBJECTS_COLORS.coding, size: 'w-5 h-5', top: '45%', left: '10%' },
  {
    color: SUBJECTS_COLORS.history,
    size: 'w-8 h-8',
    top: '60%',
    left: '92%',
  },
  {
    color: SUBJECTS_COLORS.economics,
    size: 'w-4 h-4',
    top: '75%',
    left: '30%',
  },
  {
    color: SUBJECTS_COLORS.science,
    size: 'w-6 h-6',
    top: '85%',
    left: '70%',
  },
  { color: SUBJECTS_COLORS.maths, size: 'w-7 h-7', top: '5%', left: '60%' },
  {
    color: SUBJECTS_COLORS.coding,
    size: 'w-3 h-3',
    top: '35%',
    left: '75%',
  },
  {
    color: SUBJECTS_COLORS.language,
    size: 'w-5 h-5',
    top: '92%',
    left: '15%',
  },
  // More dots for fuller effect
  {
    color: SUBJECTS_COLORS.history,
    size: 'w-6 h-6',
    top: '12%',
    left: '90%',
  },
  {
    color: SUBJECTS_COLORS.economics,
    size: 'w-3 h-3',
    top: '28%',
    left: '5%',
  },
  {
    color: SUBJECTS_COLORS.maths,
    size: 'w-9 h-9',
    top: '55%',
    left: '25%',
  },
  {
    color: SUBJECTS_COLORS.science,
    size: 'w-4 h-4',
    top: '65%',
    left: '80%',
  },
  {
    color: SUBJECTS_COLORS.coding,
    size: 'w-5 h-5',
    top: '80%',
    left: '50%',
  },
  {
    color: SUBJECTS_COLORS.language,
    size: 'w-7 h-7',
    top: '40%',
    left: '40%',
  },
  {
    color: SUBJECTS_COLORS.history,
    size: 'w-3 h-3',
    top: '95%',
    left: '85%',
  },
  {
    color: SUBJECTS_COLORS.economics,
    size: 'w-6 h-6',
    top: '5%',
    left: '35%',
  },
  {
    color: SUBJECTS_COLORS.maths,
    size: 'w-5 h-5',
    top: '50%',
    left: '95%',
  },
  {
    color: SUBJECTS_COLORS.coding,
    size: 'w-4 h-4',
    top: '20%',
    left: '25%',
  },
];
