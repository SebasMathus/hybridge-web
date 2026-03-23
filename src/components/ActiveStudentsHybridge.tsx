import React from 'react'

type ActiveStudentsHybridgeProps = {
  badge?: string
  numberValue?: string
  numberUnit?: string
}

export function ActiveStudentsHybridge({
  badge = 'COMUNIDAD HYBRIDGE',
  numberValue = '+3,500',
  numberUnit = 'Estudiantes Inscritos',
}: ActiveStudentsHybridgeProps) {
  return (
    <section className="hb-active-students" aria-label="Estudiantes activos Hybridge">
      <div className="container-hb hb-active-students__inner">
        <div className="hb-active-students__content">
          <div className="hb-active-students__badge">{badge}</div>

          <div className="hb-active-students__number">
            <span className="hb-active-students__numberValue">{numberValue}</span>
            <span className="hb-active-students__numberUnit">{numberUnit}</span>
          </div>
        </div>
      </div>

      <style>{`
        .hb-active-students{
          position: relative;
          background: radial-gradient(1200px 520px at 10% 10%, rgba(46, 255, 180, 0.14), transparent 55%),
            radial-gradient(900px 420px at 92% 40%, rgba(76, 161, 255, 0.12), transparent 55%),
            linear-gradient(180deg, #070A0B, #050607);
          overflow: hidden;
          padding: 54px 0;
        }

        .hb-active-students__inner{
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 170px;
        }

        .hb-active-students__content{
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hb-active-students__badge{
          display: inline-block;
          background: rgba(0,0,0,0.45);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.95);
          padding: 10px 16px;
          border-radius: 999px;
          font-weight: 900;
          font-size: 13px;
          letter-spacing: 0.02em;
          margin-bottom: 14px;
        }

        .hb-active-students__number{
          color: #fff;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.06;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .hb-active-students__numberValue{
          display: block;
        }

        .hb-active-students__numberUnit{
          display: block;
          font-size: clamp(1.05rem, 2vw, 1.55rem);
          font-weight: 700;
          opacity: 0.92;
        }
      `}</style>
    </section>
  )
}

