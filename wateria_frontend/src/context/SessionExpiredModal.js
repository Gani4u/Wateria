import { useEffect } from "react";

const SessionExpiredModal = () => {
  useEffect(() => {
    // Auto redirect after 7s
    const timer = setTimeout(() => {
      window.location.href = "/login";
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-center p-4">
          <h5 className="modal-title mb-3">Session Expired</h5>
            <img
                src="/nezuko_running.gif"
                alt="Nezuko Running"
                className="mx-auto d-block img-fluid"
                style={{ maxWidth: "20%", height: "auto", marginBottom: "20px" }}
            />
          <p>Your session has expired. Redirecting to login...(just in 7 sec)</p>
          <button
            className="btn btn-primary mt-2"
            onClick={() => (window.location.href = "/login")}
          >
            Go to Login Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
