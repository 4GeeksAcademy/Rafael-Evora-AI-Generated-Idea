import React from "react";

interface DeleteAccountModalProps {
  show: boolean;
  step: 1 | 2;
  deleting: boolean;
  deleteConfirmText: string;
  deleteMessage: string | null;
  onContinue: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onChangeConfirmText: (val: string) => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  show,
  step,
  deleting,
  deleteConfirmText,
  deleteMessage,
  onContinue,
  onCancel,
  onDelete,
  onChangeConfirmText,
}) => {
  if (!show) return null;
  let requested = false;
  if (deleteMessage && deleteMessage.toLowerCase().includes("request")) {
    requested = true;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white dark:bg-blue-950 p-8 rounded-xl shadow-2xl border-2 border-blue-200 dark:border-blue-800 max-w-md w-full text-center">
        {requested ? (
          <>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Request Sent!
            </h2>
            <p className="mb-4 text-blue-900 dark:text-white">
              Your account deletion request has been submitted.
              <br />
              Our team will review and process your request soon.
              <br />
              <span className="font-semibold">
                Thank you for being with us!
              </span>
            </p>
          </>
        ) : step === 1 ? (
          <>
            <h2 className="text-xl font-bold text-red-700 mb-4">
              Request Account Deletion
            </h2>
            <p className="mb-4 text-blue-900 dark:text-white">
              Are you sure you want to request deletion of your account? This
              action will be reviewed by our team.
              <br />
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-800 transition disabled:opacity-60"
                onClick={onContinue}
                disabled={deleting}
              >
                Continue
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-400 text-white font-bold hover:bg-gray-600 transition"
                onClick={onCancel}
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-red-700 mb-4">
              Confirm Deletion Request
            </h2>
            <p className="mb-4 text-blue-900 dark:text-white">
              Please type <span className="font-mono font-bold">REQUEST</span>{" "}
              to confirm you want to request account deletion.
            </p>
            <input
              className="w-full px-3 py-2 mb-4 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100 text-center"
              value={deleteConfirmText}
              onChange={(e) => onChangeConfirmText(e.target.value)}
              placeholder="Type REQUEST to confirm"
              autoFocus
              disabled={deleting}
            />
            {deleteMessage && (
              <div className="mb-2 text-blue-600 dark:text-blue-400">
                {deleteMessage}
              </div>
            )}
            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-800 transition disabled:opacity-60"
                onClick={onDelete}
                disabled={deleting || deleteConfirmText !== "REQUEST"}
              >
                {deleting ? "Requesting..." : "Request Deletion"}
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-400 text-white font-bold hover:bg-gray-600 transition"
                onClick={onCancel}
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteAccountModal;
