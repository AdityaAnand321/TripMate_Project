import React from 'react';

export default function Modal({ isOpen, title, onClose, children, actions }) {
	if (!isOpen) return null;

		const overlayStyle = {
			position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
			background: 'rgba(2,6,23,0.6)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)',
			display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
		};
	const contentStyle = {
		background: '#fff', width: '100%', maxWidth: 420, borderRadius: 12,
			boxShadow: '0 16px 48px rgba(2,6,23,0.28)', overflow: 'hidden'
	};
	const headerStyle = {
		padding: '14px 18px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
	};
	const titleStyle = { margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a' };
	const bodyStyle = { padding: '14px 18px', color: '#374151' };
	const footerStyle = { padding: '12px 18px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: 10, justifyContent: 'flex-end' };
	const closeBtnStyle = { background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer', color: '#6b7280' };

	return (
		<div style={overlayStyle} role="dialog" aria-modal="true">
			<div style={contentStyle}>
				<div style={headerStyle}>
					<h3 style={titleStyle}>{title}</h3>
					<button onClick={onClose} aria-label="Close" style={closeBtnStyle}>×</button>
				</div>
				<div style={bodyStyle}>{children}</div>
				{actions && <div style={footerStyle}>{actions}</div>}
			</div>
		</div>
	);
}

