import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { documentService } from "../services/document.service";
import type { Document } from "../../core/types/domain";

export const DOCUMENT_QUERY_KEY = "documents" as const;
export const TEMPLATE_QUERY_KEY = "templates" as const;

export function useDocumentQuery(id: string | undefined) {
  return useQuery({
    queryKey: [DOCUMENT_QUERY_KEY, id],
    queryFn: () => documentService.getDocumentById(id!),
    enabled: !!id,
  });
}

export function useDocumentWithTemplateQuery(id: string | undefined) {
  return useQuery({
    queryKey: [DOCUMENT_QUERY_KEY, "withTemplate", id],
    queryFn: () => documentService.loadDocumentWithTemplate(id!),
    enabled: !!id,
  });
}

export function useSaveDocumentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (doc: Document) => documentService.saveDocument(doc),
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: [DOCUMENT_QUERY_KEY] });
      queryClient.setQueryData([DOCUMENT_QUERY_KEY, saved.id], saved);
    },
  });
}
