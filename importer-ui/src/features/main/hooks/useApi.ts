import { useMemo } from "react";
import { Importer, Template, Upload } from "../../../api/types";
import useGetImporter from "../../../api/useGetImporter";
import useGetUpload from "../../../api/useGetUpload";
import useMutableLocalStorage from "./useMutableLocalStorage";

export default function useApi(importerId: string) {
  const [tusId, setTusId] = useMutableLocalStorage(importerId + "-tusId", "");

  const tusWasStored = useMemo(() => !!tusId, []);

  // Load importer & template for the first step
  const { data: importer = {} as Importer, isLoading: isLoadingImporter, error: importerError } = useGetImporter(importerId);
  const { template = {} as Template } = importer;

  // Load upload for the second step
  const { data: upload = {} as Upload, error: uploadError } = useGetUpload(tusId);
  const { is_parsed: isParsed } = upload;

  return { tusId, tusWasStored, importer, isLoadingImporter, importerError, template, upload, uploadError, isParsed, setTusId };
}
