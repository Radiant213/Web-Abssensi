import { Card } from "./ui/Card";
import { motion, AnimatePresence } from "framer-motion";

interface ScanHistoryProps {
    logs: Array<{
        id: string;
        nama: string;
        waktu: string;
    }>;
}

export function ScanHistory({ logs }: ScanHistoryProps) {
    return (
        <Card className="h-full min-h-[400px]">
            <h2 className="text-lg font-semibold mb-6 flex items-center justify-between">
                Recent Activity
                <span className="text-xs font-normal text-gray-500 bg-white/5 px-2 py-1 rounded">
                    Total: {logs.length}
                </span>
            </h2>

            <div className="overflow-hidden">
                <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                        {logs.map((log, index) => (
                            <motion.li
                                key={`${log.id}-${index}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-200">{log.nama}</span>
                                    <span className="text-xs text-gray-500 font-mono">ID: {log.id}</span>
                                </div>
                                <span className="text-xs text-gray-400">{log.waktu}</span>
                            </motion.li>
                        ))}

                        {logs.length === 0 && (
                            <li className="text-center text-gray-500 py-8 text-sm">
                                No activity recorded yet.
                            </li>
                        )}
                    </AnimatePresence>
                </ul>
            </div>
        </Card>
    );
}
