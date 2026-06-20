import Dexie, { type Table } from 'dexie';
import type { Template, Document } from '../../core/types/domain';

export class AppDatabase extends Dexie {
  templates!: Table<Template, string>;
  documents!: Table<Document, string>;

  constructor() {
    super('PaperlessOverlayDB');
    this.version(1).stores({
      templates: 'id, name, createdAt, updatedAt', // Index by id, name, dates
      documents: 'id, templateId, createdAt, updatedAt', // Index by id, templateId, dates
    });
  }
}

export const db = new AppDatabase();
