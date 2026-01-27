'use client';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import soundwaves from '@/assets/soundwaves.json';
import { ASSETS } from '@/config/assets';
import { useCompanionSession } from '@/hooks/use-companion-session';
import { downloadTranscript } from '@/lib/download';
import { cn, getSubjectColor } from '@/lib/utils';
import { CallStatus, Companion, SavedMessage } from '@/types';

interface CompanionComponentProps extends Companion {
  userName: string;
  userImage: string;
  style?: string;
  voice?: string;
}

const CompanionComponent = ({
  id,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const t = useTranslations('CompanionSessionPage');

  const {
    callStatus,
    isSpeaking,
    isMuted,
    messages,
    toggleMic,
    startSession,
    endSession,
  } = useCompanionSession({
    subject,
    topic,
    name,
    userName,
    style,
    voice,
    companionId: id,
  });

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isSpeaking]);

  const handleDownloadTranscript = () => {
    downloadTranscript({ messages, userName, companionName: name });
  };

  const isLoading = callStatus === CallStatus.CONNECTING;
  const isActive = callStatus === CallStatus.ACTIVE;
  const isFinished = callStatus === CallStatus.FINISHED;
  const isInactive = callStatus === CallStatus.INACTIVE;

  return (
    <section className="flex flex-col md:h-[70vh] gap-6 w-full">
      <section className="flex gap-6 flex-col md:flex-row items-stretch shrink-0 h-fit">
        <div
          className="flex-1 bg-white border border-black rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 shadow-sm overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: getSubjectColor(subject) + '10' }}
        >
          <div
            className="relative size-[100px] md:size-[140px] rounded-3xl flex items-center justify-center transition-colors duration-500 shrink-0"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                'absolute transition-opacity duration-1000 inset-0 flex items-center justify-center',
                isFinished || isInactive ? 'opacity-100' : 'opacity-0',
                isLoading && 'opacity-100 animate-pulse',
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={100}
                height={100}
                className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] object-contain"
                priority
              />
            </div>

            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center transition-opacity duration-1000',
                isActive ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                loop={true}
                className="w-full h-full p-4"
              />
            </div>
          </div>

          <p className="font-bold text-xl md:text-2xl text-center leading-tight">
            {name}
          </p>
        </div>

        <div className="w-full md:w-80 bg-white border border-black rounded-[2rem] p-6 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100 w-full">
            <Image
              src={userImage}
              alt={userName}
              width={56}
              height={56}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
            <p className="font-bold text-lg truncate flex-1">{userName}</p>
          </div>

          <button
            type="button"
            className={cn(
              'flex items-center justify-center p-4 rounded-2xl border border-black transition-all active:scale-95 bg-white hover:bg-gray-50',
              !isActive && 'opacity-50 cursor-not-allowed grayscale',
            )}
            onClick={toggleMic}
            disabled={!isActive}
            aria-label={isMuted ? t('mic_off') : t('mic_on')}
          >
            <div className="relative flex items-center gap-3">
              <Image
                src={isMuted ? ASSETS.icons.mic_off : ASSETS.icons.mic_on}
                alt={t('mic_alt')}
                width={24}
                height={24}
              />
              <span className="font-bold text-sm">
                {isMuted ? 'Turn on' : 'Turn off'}
              </span>
            </div>
          </button>

          <button
            type="button"
            className={cn(
              'flex items-center justify-center p-4 rounded-2xl border border-black transition-all active:scale-95 text-white font-bold text-sm',
              isActive
                ? 'bg-black hover:bg-black/80'
                : 'bg-black hover:bg-black/80',
              isLoading && 'cursor-wait opacity-80',
            )}
            onClick={isActive ? endSession : startSession}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : isActive ? (
              t('end_session')
            ) : (
              t('start_session')
            )}
          </button>

          {isFinished && messages.length > 0 && (
            <button
              type="button"
              className="flex items-center justify-center p-4 rounded-2xl border border-black transition-all active:scale-95 bg-white hover:bg-gray-50 text-sm font-bold gap-2"
              onClick={handleDownloadTranscript}
            >
              <Download className="w-4 h-4" />
              {t('download_transcript')}
            </button>
          )}
        </div>
      </section>

      <section className="transcript relative h-[500px] md:h-auto md:flex-1 bg-white rounded-[2rem] p-6 md:p-8 overflow-hidden border border-black shadow-sm flex flex-col min-h-0">
        <div className="transcript-message h-full overflow-y-auto pb-4 flex-1 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-base italic font-medium px-4 text-center opacity-60">
              {isActive ? t('listening') : t('transcript_placeholder')}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {messages.map((message: SavedMessage, index: number) => {
                const isAssistant = message.role === 'assistant';
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-1 animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <span
                      className={cn(
                        'text-[10px] uppercase tracking-widest font-bold underline decoration-1 underline-offset-4',
                        isAssistant
                          ? 'text-foreground decoration-foreground/30'
                          : 'text-blue-600 decoration-blue-600/30',
                      )}
                    >
                      {isAssistant ? name : userName}
                    </span>
                    <p
                      className={cn(
                        'text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium',
                        isAssistant ? 'text-foreground' : 'text-blue-600',
                      )}
                    >
                      {message.content}
                    </p>
                  </div>
                );
              })}
              <div ref={scrollRef} className="h-4" />
            </div>
          )}
        </div>

        <div className="transcript-fade absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white to-transparent pointer-events-none rounded-b-[2rem]" />
      </section>
    </section>
  );
};

export default CompanionComponent;
