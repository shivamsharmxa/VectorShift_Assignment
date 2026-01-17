// components/common/ResultModal.js
import { X, CheckCircle, AlertCircle, Network } from 'lucide-react';

export const ResultModal = ({ isOpen, onClose, result }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title-group">
                        <Network size={24} className="modal-icon" />
                        <h2>Pipeline Analysis</h2>
                    </div>
                    <button onClick={onClose} className="modal-close" aria-label="Close">
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="result-item">
                        <span className="result-label">Total Nodes</span>
                        <span className="result-value">{result.num_nodes}</span>
                    </div>

                    <div className="result-item">
                        <span className="result-label">Total Edges</span>
                        <span className="result-value">{result.num_edges}</span>
                    </div>

                    <div className="result-item">
                        <span className="result-label">Graph Type</span>
                        {result.is_dag ? (
                            <span className="result-badge success">
                                <CheckCircle size={16} /> Valid DAG
                            </span>
                        ) : (
                            <span className="result-badge error">
                                <AlertCircle size={16} /> Contains Cycle
                            </span>
                        )}
                    </div>

                    {!result.is_dag && (
                        <div className="result-warning">
                            <AlertCircle size={16} />
                            <span>
                                Your pipeline contains a cycle. DAG (Directed Acyclic Graph)
                                pipelines should not have circular dependencies.
                            </span>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button onClick={onClose} className="modal-btn-primary">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
