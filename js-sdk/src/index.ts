import { TableFlowImporterProps } from "./types/index";
import "./index.css";
import cross from "./assets/cross";

export default function createTableFlowImporter({
  elementId = "tableflow-importer",
  isOpen = true,
  onRequestClose = () => null,
  importerId,
  hostUrl,
  darkMode = false,
  primaryColor = "#7a5ef8",
  metadata = "{}",
  closeOnClickOutside,
  className,
}: TableFlowImporterProps) {
  // CSS classes
  const baseClass = "TableFlowImporter";
  const themeClass = darkMode && `${baseClass}-dark`;
  const dialogClass = [`${baseClass}-dialog`, themeClass, className]
    .filter((i) => i)
    .join(" ");
  const closeClass = `${baseClass}-close`;

  // dialog element
  let dialog = document.getElementById(elementId) as HTMLDialogElement;

  const backdropClick = () => {
    if (closeOnClickOutside) onRequestClose();
  };

  if (dialog === null) {
    dialog = document.createElement("dialog") as HTMLDialogElement;
    document.body.appendChild(dialog);
    dialog.setAttribute("id", elementId);
    dialog.addEventListener("click", backdropClick);
  }

  dialog.setAttribute("class", dialogClass);

  // iframe element
  const urlParams = {
    importerId,
    darkMode: darkMode.toString(),
    primaryColor,
    metadata,
    isOpen: isOpen.toString(),
  };
  const searchParams = new URLSearchParams(urlParams);
  const defaultImporterUrl = "https://importer.tableflow.com";
  const uploaderUrl = `${
    hostUrl ? hostUrl : defaultImporterUrl
  }?${searchParams}`;

  try {
    JSON.parse(metadata);
  } catch (e) {
    console.error(
      'The "metadata" prop is not a valid JSON string. Please check the documentation for more details.'
    );
  }

  window.onmessage = function (e) {
    if (e.data == "close") {
      onRequestClose();
    }
  };

  dialog.innerHTML = `<iframe src="${uploaderUrl}" />`;

  // close button
  const close = document.createElement("button");
  close.setAttribute("class", closeClass);
  close.addEventListener("click", () => onRequestClose());
  close.innerHTML = `<span>${cross}</span>`;
  dialog.appendChild(close);

  return dialog;
}
