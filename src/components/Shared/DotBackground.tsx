import DotGrid from "@/components/Shared/Backgrounds/DotGrid/DotGrid";

const DotBackground = () => (
  <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none" }}>
    <DotGrid
      dotSize={2}
      gap={13}
      baseColor="#271e37"
      activeColor="#5227ff"
      proximity={300}
      shockRadius={250}
      shockStrength={40}
      resistance={2000}
      returnDuration={4}
    />
    {/* Vintage Overlay */}
    {/* <div
      style={{
        position: "absolute",
        inset: 0,
        background: "blac",
        pointerEvents: "none",
        mixBlendMode: "multiply",
      }}
    /> */}

    {/* Vignette */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 80%, #1a1310 100%)",
        opacity: 0.5,
      }}
    />
  </div>
);

export default DotBackground;
