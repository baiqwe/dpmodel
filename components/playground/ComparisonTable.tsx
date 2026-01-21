import { Check, X } from "lucide-react";

const ComparisonTable = () => {
    const features = [
        { name: "MATH-500 Score", model1: "97.3%", gpt4: "94.1%", o1: "96.4%", highlight: true },
        { name: "HumanEval", model1: "92.1%", gpt4: "88.4%", o1: "90.2%", highlight: false },
        { name: "MMLU", model1: "91.8%", gpt4: "90.2%", o1: "92.0%", highlight: false },
        { name: "Context Window", model1: "128K", gpt4: "128K", o1: "200K", highlight: false },
        { name: "Open Source", model1: true, gpt4: false, o1: false, highlight: true },
        { name: "API Cost (per 1M tokens)", model1: "$0.14", gpt4: "$30.00", o1: "$15.00", highlight: true },
        { name: "FlashMLA Support", model1: true, gpt4: false, o1: false, highlight: false },
        { name: "Multi-step Reasoning", model1: true, gpt4: true, o1: true, highlight: false },
    ];

    const renderValue = (value: string | boolean) => {
        if (typeof value === "boolean") {
            return value ? (
                <Check className="w-5 h-5 text-green-400" />
            ) : (
                <X className="w-5 h-5 text-red-400/60" />
            );
        }
        return <span className="font-mono">{value}</span>;
    };

    return (
        <section className="px-4 py-20" id="comparison">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-gradient">Model Comparison</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        See how DeepSeek Model1 stacks up against other leading AI models
                    </p>
                </div>

                <div className="glass-panel rounded-2xl overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                        Feature
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-primary font-semibold">DeepSeek Model1</span>
                                            <span className="text-xs text-muted-foreground">R1 / V3</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-foreground font-medium">GPT-4</span>
                                            <span className="text-xs text-muted-foreground">Turbo</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-foreground font-medium">OpenAI o1</span>
                                            <span className="text-xs text-muted-foreground">Preview</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b border-border/50 ${feature.highlight ? 'bg-primary/5' : ''}`}
                                    >
                                        <td className="px-6 py-4 text-sm text-foreground">
                                            {feature.name}
                                        </td>
                                        <td className="px-6 py-4 text-center text-primary font-medium">
                                            <div className="flex justify-center">
                                                {renderValue(feature.model1)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-muted-foreground">
                                            <div className="flex justify-center">
                                                {renderValue(feature.gpt4)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-muted-foreground">
                                            <div className="flex justify-center">
                                                {renderValue(feature.o1)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-4">
                    * Benchmarks based on publicly available data (Source: DeepSeek Technical Report 2024). Performance may vary.
                </p>
            </div>
        </section>
    );
};

export default ComparisonTable;
