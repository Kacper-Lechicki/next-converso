import { SavedMessage } from '@/types';

interface DownloadTranscriptProps {
  messages: SavedMessage[];
  userName: string;
  companionName: string;
}

export const downloadTranscript = ({
  messages,
  userName,
  companionName,
}: DownloadTranscriptProps) => {
  if (messages.length === 0) return;

  const transcriptContent = messages
    .map(
      (msg) =>
        `**${msg.role === 'assistant' ? companionName : userName}:**\n${msg.content}\n`,
    )
    .join('\n');

  const blob = new Blob([transcriptContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = `session-transcript-${new Date().toISOString().split('T')[0]}.md`;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};
