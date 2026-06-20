import { db } from '../db/dexie.config';
import type { ITemplateRepository, IDocumentRepository } from './interfaces';
import type { Template, Document } from '../../core/types/domain';

export class DexieTemplateRepository implements ITemplateRepository {
  async getAll(): Promise<Template[]> {
    return db.templates.orderBy('createdAt').reverse().toArray();
  }

  async getById(id: string): Promise<Template | undefined> {
    return db.templates.get(id);
  }

  async save(template: Template): Promise<void> {
    await db.templates.put(template);
  }

  async delete(id: string): Promise<void> {
    await db.templates.delete(id);
  }
}

export class DexieDocumentRepository implements IDocumentRepository {
  async getAll(templateId?: string): Promise<Document[]> {
    if (templateId) {
      return db.documents.where('templateId').equals(templateId).reverse().sortBy('createdAt');
    }
    return db.documents.orderBy('createdAt').reverse().toArray();
  }

  async getById(id: string): Promise<Document | undefined> {
    return db.documents.get(id);
  }

  async save(document: Document): Promise<void> {
    await db.documents.put(document);
  }

  async delete(id: string): Promise<void> {
    await db.documents.delete(id);
  }
}

// Export singletons for easier usage
export const templateRepository = new DexieTemplateRepository();
export const documentRepository = new DexieDocumentRepository();
