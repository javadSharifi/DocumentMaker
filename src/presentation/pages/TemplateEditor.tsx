import React from "react";
import { Layout } from "../layouts/Layout";
import { UploadModal } from "../components/editor/UploadModal";
import { EditorToolbar } from "../components/editor/EditorToolbar";
import { EditorCanvas } from "../components/editor/EditorCanvas";
import { EditorLoadingState } from "../components/editor/EditorLoadingState";
import { useTemplateEditor } from "@/application/hooks/useTemplateEditor";
import { EditorSidebar } from "../components/editor/Editorsidebar";

export const TemplateEditor: React.FC = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    isProcessing,
    handleUploadAction,
    isLoading,
  } = useTemplateEditor();

  if (isLoading) {
    return <EditorLoadingState />;
  }

  return (
    <Layout>
      <UploadModal
        isOpen={isModalOpen}
        onUpload={handleUploadAction}
        isProcessing={isProcessing}
      />

      <div className="h-[calc(100vh-100px)] md:h-[calc(100vh-140px)] flex flex-col gap-4 md:gap-6">
        <EditorToolbar onUploadClick={() => setIsModalOpen(true)} />

        <div className="flex flex-1 overflow-hidden gap-4 md:gap-6">
          <EditorCanvas />
          <EditorSidebar />
        </div>
      </div>
    </Layout>
  );
};
