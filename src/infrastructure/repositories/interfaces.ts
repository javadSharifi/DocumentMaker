import type { Template, Document } from '../../core/types/domain';

export interface ITemplateRepository {
  getAll(): Promise<Template[]>;
  getById(id: string): Promise<Template | undefined>;
  save(template: Template): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IDocumentRepository {
  getAll(templateId?: string): Promise<Document[]>;
  getById(id: string): Promise<Document | undefined>;
  save(document: Document): Promise<void>;
  delete(id: string): Promise<void>;
}
