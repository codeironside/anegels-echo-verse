import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const documents = new Map<string, { doc: Y.Doc; provider: WebsocketProvider }>();

export const getYjsDoc = (documentId: string) => {
  if (documents.has(documentId)) {
    return documents.get(documentId)!;
  }

  const doc = new Y.Doc();
  const provider = new WebsocketProvider('ws://localhost:1234', documentId, doc, {
    connect: false // Don't connect immediately
  });

  documents.set(documentId, { doc, provider });
  return { doc, provider };
};

export const destroyYjsDoc = (documentId: string) => {
  const instance = documents.get(documentId);
  if (instance) {
    instance.provider.destroy();
    instance.doc.destroy();
    documents.delete(documentId);
  }
};