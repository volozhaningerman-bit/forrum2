import { ImageResponse } from 'next/og';

export const socialImageSize = { width: 1200, height: 630 };

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#070809',
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.42,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 620,
            height: 620,
            right: -70,
            top: 88,
            border: '2px solid rgba(255,255,255,.32)',
            borderRadius: '50%',
            display: 'flex',
            background:
              'radial-gradient(circle at 35% 22%,rgba(255,255,255,.34),rgba(255,255,255,.10) 28%,rgba(255,255,255,.025) 58%,rgba(0,0,0,.82) 78%)',
            boxShadow: '0 0 90px rgba(255,255,255,.10)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 132,
            top: 132,
            display: 'flex',
            fontSize: 58,
            color: 'rgba(255,255,255,.9)',
          }}
        >
          +
        </div>
        <div
          style={{
            width: '100%',
            padding: '72px 78px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 52,
              fontWeight: 900,
              letterSpacing: -4,
            }}
          >
            4RRUM
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
            <div
              style={{
                display: 'flex',
                fontSize: 18,
                letterSpacing: 4,
                marginBottom: 22,
                color: '#aeb4b8',
              }}
            >
              БОЛЬШЕ ЧЕМ ФОРУМ
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 72,
                lineHeight: 0.96,
                fontWeight: 900,
                letterSpacing: -3,
              }}
            >
              <span>ТЕХНОЛОГИИ.</span>
              <span>ЛЮДИ. ИДЕИ.</span>
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 26,
                fontSize: 24,
                color: '#bdc3c6',
              }}
            >
              Обсуждаем. Делимся. Развиваемся вместе.
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 16,
              letterSpacing: 2,
              color: '#8f979b',
            }}
          >
            4RRUM.RU
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
