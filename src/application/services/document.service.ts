import type { IDocumentRepository, ITemplateRepository } from "../../infrastructure/repositories/interfaces";
import { documentRepository, templateRepository } from "../../infrastructure/repositories/dexie.repository";
import type { Document, Template } from "../../core/types/domain";

export class DocumentService {
  private readonly docRepo: IDocumentRepository;
  private readonly templateRepo: ITemplateRepository;

  constructor(docRepo: IDocumentRepository, templateRepo: ITemplateRepository) {
    this.docRepo = docRepo;
    this.templateRepo = templateRepo;
  }

  async getTemplateById(id: string): Promise<Template> {
    const template = await this.templateRepo.getById(id);
    if (!template) throw new Error(`Template not found: ${id}`);
    return template;
  }

  async getDocumentById(id: string): Promise<Document> {
    const doc = await this.docRepo.getById(id);
    if (!doc) throw new Error(`Document not found: ${id}`);
    return doc;
  }

  async loadDocumentWithTemplate(id: string): Promise<{ doc: Document; template: Template }> {
    const doc = await this.getDocumentById(id);
    const template = await this.getTemplateById(doc.templateId);
    return { doc, template };
  }

  async saveDocument(doc: Document): Promise<Document> {
    const toSave = { ...doc, updatedAt: Date.now() };
    await this.docRepo.save(toSave);
    return toSave;
  }
}

export const documentService = new DocumentService(documentRepository, templateRepository);
