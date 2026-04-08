export default function OldSignInBanner() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="relative py-2 px-4 bg-gradient-to-r from-yellow-400 to-[#FFD700] border-4 border-transparent rounded-lg animate-border">
          <div className="overflow-hidden">
            <div className="whitespace-nowrap animate-marquee">
              <span className="text-2xl font-extrabold text-black tracking-wider">
                LAST DATE TO REGISTER IS ON 10TH MARCH 2025. PLEASE ENSURE TO
                SUBMIT YOUR REGISTRATION BEFORE THE LAST DATE. DON'T MISS OUT ON
                THIS EXTRAORDINARY OPPORTUNITY TO JOIN AN EVENT FILLED WITH
                TRANSFORMATIVE EXPERIENCES, ENRICHING WORKSHOPS, AND INVALUABLE
                NETWORKING MOMENTS!
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }

        @keyframes glowing-border {
          0% {
            border-color: #ffd700;
          }
          50% {
            border-color: #ff4500;
          }
          100% {
            border-color: #ffd700;
          }
        }
        .animate-border {
          border-width: 5px;
          border-style: solid;
          border-image-source: linear-gradient(
            45deg,
            #ffd700,
            #ff4500,
            #ffd700
          );
          border-image-slice: 1;
          animation: glowing-border 3s infinite alternate;
        }
      `}</style>
    </>
  );
}
