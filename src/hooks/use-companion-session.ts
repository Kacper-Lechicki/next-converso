import { useEffect, useState } from 'react';

import { addToSessionHistory } from '@/actions/companion';

import { configureAssistant, DEFAULT_STYLE, DEFAULT_VOICE } from '@/config/app';
import { vapi } from '@/lib/vapi/vapi.sdk';
import { CallStatus, Message, SavedMessage } from '@/types';

interface UseCompanionSessionProps {
  subject: string;
  topic: string;
  name: string;
  userName: string;
  style?: string;
  voice?: string;
  companionId: string;
}

export const useCompanionSession = ({
  subject,
  topic,
  style,
  voice,
  companionId,
}: UseCompanionSessionProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          const newMessageContent = message.transcript;

          if (lastMessage?.role === message.role) {
            const updatedLastMessage = {
              ...lastMessage,
              content: `${lastMessage.content.trim()} ${newMessageContent.trim()}`,
            };

            return [...prev.slice(0, -1), updatedLastMessage];
          }

          const newMessage = {
            role: message.role,
            content: newMessageContent,
          };

          return [...prev, newMessage];
        });
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.error('Vapi Error:', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
    };
  }, [companionId]);

  const toggleMic = () => {
    const newMutedState = !isMuted;
    vapi.setMuted(newMutedState);
    setIsMuted(newMutedState);
  };

  const startSession = async () => {
    try {
      setMessages([]);
      setCallStatus(CallStatus.CONNECTING);

      const assistantOverrides = {
        variableValues: { subject, topic, style },
        clientMessages: ['transcript'],
        serverMessages: [],
      } as unknown as Parameters<typeof vapi.start>[1];

      await vapi.start(
        configureAssistant(voice ?? DEFAULT_VOICE, style ?? DEFAULT_STYLE),
        assistantOverrides,
      );
    } catch {
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const endSession = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return {
    callStatus,
    isSpeaking,
    isMuted,
    messages,
    toggleMic,
    startSession,
    endSession,
  };
};
