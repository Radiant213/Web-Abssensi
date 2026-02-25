import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/Card";
import { User, Clock, ShieldCheck } from "lucide-react";

interface latestScanProps {
    data: {
        id: string;
        nama: string;
        waktu: string;
    } | null;
}

export function LatestScan({ data }: latestScanProps) {
    return (
        <Card className="relative overflow-hidden min-h-[200px] flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-4 opacity-50">
                <ShieldCheck size={100} className="text-white/5" />
            </div>

            <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Latest Access
            </h2>

            <AnimatePresence mode="wait">
                {data ? (
                    <motion.div
                        key={data.waktu} // Re-animate on new data
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative z-10"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                                <User size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white">{data.nama}</h3>
                                <p className="text-sm text-gray-400 font-mono">ID: {data.id}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-300 bg-white/5 w-fit px-3 py-1.5 rounded-md">
                            <Clock size={16} className="text-violet-400" />
                            {data.waktu}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center text-center py-4"
                    >
                        <div className="p-4 rounded-full bg-white/5 mb-3">
                            <ShieldCheck size={32} className="text-gray-600" />
                        </div>
                        <p className="text-gray-500">Waiting for incoming data...</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
