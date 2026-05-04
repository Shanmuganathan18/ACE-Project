import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Section({ title, content, color, emoji }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="section" style={{ borderLeftColor: color }}>
      <div
        className="section-header"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h3>{emoji} {title}</h3>
        <span style={{ fontSize: '20px', color: '#aaa' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <p style={{ marginTop: '14px', lineHeight: '1.9',
          color: '#aabbcc', fontSize: '14px' }}>{content}</p>
      )}
    </div>
  );
}

function PartDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/parts/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!data) return (
    <div style={{ padding: '60px', textAlign: 'center', color: '#aaa' }}>
      Loading...
    </div>
  );

  return (
    <div className="detail">
      <button onClick={() => navigate(-1)}>← Back</button>

      {data.part.image_url && (
        <img
          src={data.part.image_url}
          alt={data.part.name}
          style={{
            width: '100%',
            maxHeight: '320px',
            objectFit: 'contain',
            borderRadius: '16px',
            margin: '20px 0',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        />
      )}

      <h2>{data.part.name}</h2>
      <p className="category">📂 {data.part.category}</p>

      <Section title="Manufacturing Process"
        content={data.detail.manufacturing}
        color="#3498db" emoji="⚙️" />
      <Section title="Physics Concepts"
        content={data.detail.physics}
        color="#e74c3c" emoji="⚡" />
      <Section title="Chemistry & Materials"
        content={data.detail.chemistry}
        color="#2ecc71" emoji="🧪" />
      <Section title="Mathematics & Formulas"
        content={data.detail.mathematics}
        color="#f39c12" emoji="📐" />
    </div>
  );
}

export default PartDetail;