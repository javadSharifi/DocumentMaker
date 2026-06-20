import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { templateService } from "../services/template.service";
import type { Template } from "../../core/types/domain";

export const TEMPLATE_QUERY_KEY = "templates" as const;

export function useTemplateQuery(id: string | undefined) {
  return useQuery({
    queryKey: [TEMPLATE_QUERY_KEY, id],
    queryFn: () => templateService.getById(id!),
    enabled: !!id,
  });
}

export function useSaveTemplateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (template: Template) => templateService.save(template),
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: [TEMPLATE_QUERY_KEY] });
      queryClient.setQueryData([TEMPLATE_QUERY_KEY, saved.id], saved);
    },
  });
}

export function useDeleteTemplateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => templateService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEMPLATE_QUERY_KEY] });
    },
  });
}
