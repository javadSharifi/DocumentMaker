import type { ITemplateRepository } from "../../infrastructure/repositories/interfaces";
import { templateRepository } from "../../infrastructure/repositories/dexie.repository";
import type { Template } from "../../core/types/domain";

export class TemplateService {
  private readonly repo: ITemplateRepository;

  constructor(repo: ITemplateRepository) {
    this.repo = repo;
  }

  async getById(id: string): Promise<Template> {
    const template = await this.repo.getById(id);
    if (!template) {
      throw new Error(`Template not found: ${id}`);
    }
    return template;
  }

  async save(template: Template): Promise<Template> {
    const toSave = { ...template, updatedAt: Date.now() };
    await this.repo.save(toSave);
    return toSave;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

export const templateService = new TemplateService(templateRepository);
