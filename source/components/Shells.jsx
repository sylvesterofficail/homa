// Empty containers the interactive layer fills: modal and toast.
export default function Shells() {
  return (
    <>
      <div className="modal-backdrop" id="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="modal-card">
          <div className="modal-header">
            <div>
              <div className="modal-eyebrow" id="modalEyebrow">Portfolio</div>
              <h2 id="modalTitle">Details</h2>
            </div>
            <button className="modal-close-btn" id="modalClose" aria-label="Close">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </div>
          <div className="modal-body" id="modalContent" />
          <div className="modal-footer" id="modalFooter" />
        </div>
      </div>
      <div className="toast-notice" id="toastNotice" role="status" aria-live="polite" />
    </>
  );
}
