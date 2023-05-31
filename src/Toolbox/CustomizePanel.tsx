import React from 'react';

export default function CustomizePanel() {
  return (
    <div style={{ margin: '30px' }}>
      <div>
        <h3>Customize</h3>
      </div>
      <button
        type="submit"
        style={{
          background: 'black',
          color: 'white',
          width: '240px',
          height: '40px',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Resize template
      </button>
      <div>
        <h5>1920 x 1080</h5>
      </div>
      <div
        style={{
          background: 'lightgray',
          width: '240px',
          height: '120px',
          border: '1px solid lightgray',
          borderRadius: '8px',
          padding: '0.5rem 1rem',
        }}
      >
        <div>Background color</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0.5rem',
          paddingTop: '0.5rem',
        }}
        >
          <div style={{
            background: 'rgb(128, 0, 0)',
            borderRadius: '4px',
            border: '1px solid lightgray',
            width: '30px',
            height: '30px',
          }}
          />
          <div style={{
            background: 'rgb(200, 100, 0)',
            borderRadius: '4px',
            border: '1px solid lightgray',
            width: '30px',
            height: '30px',
          }}
          />
          <div style={{
            background: 'rgb(250, 200, 0)',
            borderRadius: '4px',
            border: '1px solid lightgray',
            width: '30px',
            height: '30px',
          }}
          />
          <div style={{
            background: 'rgb(0, 128, 0)',
            borderRadius: '4px',
            border: '1px solid lightgray',
            width: '30px',
            height: '30px',
          }}
          />
          <div style={{
            background: 'rgb(0, 0, 128)',
            borderRadius: '4px',
            border: '1px solid lightgray',
            width: '30px',
            height: '30px',
          }}
          />
          <div style={{
            background: 'rgb(255, 255, 255)',
            borderRadius: '4px',
            border: '1px solid lightgray',
            width: '30px',
            height: '30px',
          }}
          />
          <div style={{
            background: 'rgb(128, 128, 128)',
            borderRadius: '4px',
            border: '1px solid lightgray',
            width: '30px',
            height: '30px',
          }}
          />
          <div style={{
            background: 'rgb(0, 0, 0)',
            borderRadius: '4px',
            border: '1px solid lightgray',
            width: '30px',
            height: '30px',
          }}
          />
        </div>
      </div>
    </div>
  );
}
