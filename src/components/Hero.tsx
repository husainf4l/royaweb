"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Ensure we're running in browser environment
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set dimensions with a slight delay to ensure proper initialization
    const resizeCanvas = () => {
      try {
        if (canvas && ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      } catch (err) {
        console.error("Canvas resize error:", err);
      }
    };

    resizeCanvas();

    // Neural network nodes with reduced complexity for better performance
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }[] = [];
    const numParticles = Math.min(30, Math.floor(window.innerWidth / 50)); // Adjust particle count based on screen size
    const connectionDistance = Math.min(150, window.innerWidth / 10);

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 1.2, // Increased speed multiplier
        speedY: (Math.random() - 0.5) * 1.2, // Increased speed multiplier
      });
    }

    let animationId: number;
    let isComponentMounted = true; // Track component mounting state

    function animate() {
      // Check if component is still mounted before animation frame
      if (!isComponentMounted) return;

      try {
        // Extra safety checks before each frame
        if (!canvas || !ctx || typeof window === "undefined") {
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Move particles
          p.x += p.speedX;
          p.y += p.speedY;

          // Boundary check with extra validation
          if (p.x < 0 || p.x > (canvas?.width || window.innerWidth))
            p.speedX *= -1;
          if (p.y < 0 || p.y > (canvas?.height || window.innerHeight))
            p.speedY *= -1;

          // Only proceed with drawing if context is available
          if (ctx) {
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(65, 184, 255, 0.85)"; // Increased opacity
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < connectionDistance) {
                const opacity = 1 - distance / connectionDistance;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(65, 184, 255, ${opacity * 0.7})`; // Increased opacity multiplier
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }

        // Use a try-catch when requesting animation frame
        try {
          animationId = requestAnimationFrame(animate);
        } catch (frameError) {
          console.error("Animation frame error:", frameError);
        }
      } catch (error) {
        console.error("Animation render error:", error);
        if (typeof cancelAnimationFrame === "function" && animationId) {
          cancelAnimationFrame(animationId);
        }
      }
    }

    // Only start animation after a small delay to ensure client-side execution
    const timeoutId = setTimeout(() => {
      if (typeof window !== "undefined" && canvas && ctx) {
        animate();
      }
    }, 100);

    // Handle resize
    const handleResize = () => {
      try {
        resizeCanvas();
      } catch (error) {
        console.error("Resize error:", error);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function with improved safety
    return () => {
      isComponentMounted = false;
      clearTimeout(timeoutId);
      if (
        typeof window !== "undefined" &&
        typeof cancelAnimationFrame === "function"
      ) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 bg-gray-200">
        <Image
          src={"/images/hero-bg.webp"} // Path to your image
          alt="Hero Background" // Alt text for accessibility
          fill // Use the fill prop for responsive images
          className="object-cover" // Use CSS for object-fit
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Neural Network Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0.85 }} // Increased overall canvas opacity
      />

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-2xl flex flex-col items-start">
          <h2 className="text-2xl md:text-4xl font-medium mt-4 text-left">
            مستقبل التفاعل الكروي يبدأ من هنا
          </h2>
          <div className="w-20 h-1 bg-blue-500 my-6"></div>
          <p className="text-lg md:text-xl  text-white">
            باستخدام تقنيات الواقع المعزز والذكاء الاصطناعي، تتيح لك &quot;رؤية
            ٣٤&quot; تجربة مشاهدة غير مسبوقة داخل الملاعب. شاهد الإحصائيات
            الحية، أعد اللحظات التاريخية، وتفاعل مع تفاصيل المباراة كما لم تفعل
            من قبل.
          </p>
          <button className="mt-8 bg-transparent border-2 border-blue-400 hover:bg-blue-600 hover:border-blue-600 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900">
            <span>ابدأ الآن</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
