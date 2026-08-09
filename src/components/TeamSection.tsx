import React from 'react';
import { TEAM_MEMBERS } from '../data/elevateData';
import { motion } from 'motion/react';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-[70px] md:py-[90px] relative border-t border-[#182234]">
      <div className="w-[min(1120px,92%)] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-[#60A5FA] text-xs font-extrabold tracking-[2px] uppercase mb-2.5">
            THE PEOPLE
          </div>

          <h2 className="text-[32px] sm:text-[42px] md:text-[55px] font-bold leading-[1.05] tracking-[-2px] max-w-[760px] text-[#F8FAFC]">
            Founder-led. Creator-first.
          </h2>

          <p className="text-[#94A3B8] max-w-[700px] text-base sm:text-[17px] mt-4 leading-relaxed">
            Elevate OS is being built from the ground up with a long-term vision for the creator economy.
          </p>
        </motion.div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-9">
          {TEAM_MEMBERS.map((person, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="p-7 border border-[#1E293B] rounded-3xl bg-[#0E1624] hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between shadow-xl"
              id={`team-person-${idx}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-[23px] font-bold text-white">
                    {person.name}
                  </h3>
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#60A5FA] tracking-wider uppercase">
                    {person.role}
                  </span>
                </div>

                <div className="text-[#60A5FA] text-xs font-bold tracking-[1px] my-2">
                  {person.subtitle.toUpperCase()}
                </div>

                <p className="text-[#94A3B8] text-sm leading-relaxed mt-3">
                  {person.bio}
                </p>

                {/* HIGHLIGHTS */}
                <div className="mt-5 pt-4 border-t border-[#1E293B] space-y-2">
                  {person.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
