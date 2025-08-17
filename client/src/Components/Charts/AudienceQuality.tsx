import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import type { Visit } from '@/types/visits';
import { useMemo } from 'react';
import {
    Award,
    TrendingUp,
    Users,
    Globe,
    Smartphone,
    Clock,
} from 'lucide-react';

interface AudienceQualityProps {
    visits: Visit[];
}

interface QualityMetric {
    category: string;
    score: number;
    maxScore: number;
    description: string;
    icon: React.ReactNode;
}

const AudienceQuality = ({ visits }: AudienceQualityProps) => {
    const qualityAnalysis = useMemo(() => {
        if (visits.length === 0) {
            return {
                overallScore: 0,
                grade: 'N/A',
                metrics: [],
                insights: [],
            };
        }

        const totalVisits = visits.length;

        // Calculate individual quality metrics
        const uniqueCountries = new Set(visits.map((v) => v.location.country))
            .size;
        const uniqueCities = new Set(visits.map((v) => v.location.city)).size;
        const uniqueBrowsers = new Set(visits.map((v) => v.browser)).size;
        const uniqueDevices = new Set(visits.map((v) => v.device)).size;

        // Time distribution analysis (visits across different hours)
        const hourDistribution = visits.reduce((acc, visit) => {
            const hour = new Date(visit.timestamp).getHours();
            acc[hour] = (acc[hour] || 0) + 1;
            return acc;
        }, {} as Record<number, number>);

        const activeHours = Object.keys(hourDistribution).length;

        // Quality scoring (out of 100)
        const metrics: QualityMetric[] = [
            {
                category: 'Geographic Reach',
                score: Math.min(uniqueCountries * 20, 100), // 5+ countries = 100 points
                maxScore: 100,
                description: `${uniqueCountries} countries, ${uniqueCities} cities`,
                icon: <Globe className="h-4 w-4" />,
            },
            {
                category: 'Device Diversity',
                score: Math.min(uniqueDevices * 25 + uniqueBrowsers * 10, 100), // Diverse = better
                maxScore: 100,
                description: `${uniqueDevices} device types, ${uniqueBrowsers} browsers`,
                icon: <Smartphone className="h-4 w-4" />,
            },
            {
                category: 'Time Distribution',
                score: Math.min(activeHours * 4, 100), // 24 hours = 96 points
                maxScore: 100,
                description: `Active across ${activeHours} different hours`,
                icon: <Clock className="h-4 w-4" />,
            },
            {
                category: 'Audience Size',
                score: Math.min(totalVisits * 2, 100), // 50+ visits = 100 points
                maxScore: 100,
                description: `${totalVisits} total visitors analyzed`,
                icon: <Users className="h-4 w-4" />,
            },
        ];

        // Calculate overall score
        const overallScore = Math.round(
            metrics.reduce((sum, metric) => sum + metric.score, 0) /
                metrics.length
        );

        // Determine grade
        let grade = 'F';
        if (overallScore >= 90) grade = 'A+';
        else if (overallScore >= 85) grade = 'A';
        else if (overallScore >= 80) grade = 'A-';
        else if (overallScore >= 75) grade = 'B+';
        else if (overallScore >= 70) grade = 'B';
        else if (overallScore >= 65) grade = 'B-';
        else if (overallScore >= 60) grade = 'C+';
        else if (overallScore >= 55) grade = 'C';
        else if (overallScore >= 50) grade = 'C-';
        else if (overallScore >= 40) grade = 'D';

        // Generate insights
        const insights = [];
        if (uniqueCountries >= 5) insights.push('Excellent global reach');
        if (uniqueDevices >= 3) insights.push('Cross-platform audience');
        if (activeHours >= 18) insights.push('24/7 engagement pattern');
        if (totalVisits >= 100) insights.push('Strong audience volume');
        if (uniqueBrowsers >= 4) insights.push('Diverse tech preferences');

        return {
            overallScore,
            grade,
            metrics,
            insights,
        };
    }, [visits]);

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
        if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
        if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
        if (grade.startsWith('D')) return 'text-orange-600 bg-orange-100';
        return 'text-red-600 bg-red-100';
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-blue-600';
        if (score >= 40) return 'text-yellow-600';
        return 'text-red-600';
    };

    if (visits.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Audience Quality Score
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                    <p className="text-sm text-muted-foreground">
                        No audience data available
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Audience Quality Score
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Comprehensive audience analysis based on reach and diversity
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Overall Score Display */}
                <div className="flex items-center justify-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div
                                className={`px-3 py-1 rounded-full text-lg font-bold ${getGradeColor(
                                    qualityAnalysis.grade
                                )}`}
                            >
                                {qualityAnalysis.grade}
                            </div>
                            <div
                                className={`text-3xl font-bold ${getScoreColor(
                                    qualityAnalysis.overallScore
                                )}`}
                            >
                                {qualityAnalysis.overallScore}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Overall Quality Score
                        </p>
                    </div>
                </div>

                {/* Individual Metrics */}
                <div className="space-y-3">
                    {qualityAnalysis.metrics.map((metric, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">
                                        {metric.icon}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {metric.category}
                                    </span>
                                </div>
                                <span
                                    className={`text-sm font-semibold ${getScoreColor(
                                        metric.score
                                    )}`}
                                >
                                    {metric.score}/100
                                </span>
                            </div>

                            <div className="w-full bg-muted/30 rounded-full h-2">
                                <div
                                    className="bg-primary rounded-full h-2 transition-all duration-500"
                                    style={{ width: `${metric.score}%` }}
                                ></div>
                            </div>

                            <p className="text-xs text-muted-foreground">
                                {metric.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Quality Insights */}
                {qualityAnalysis.insights.length > 0 && (
                    <div className="p-3 rounded-lg bg-muted/20 border">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <h5 className="text-sm font-medium">
                                Quality Highlights
                            </h5>
                        </div>
                        <ul className="space-y-1">
                            {qualityAnalysis.insights.map((insight, index) => (
                                <li
                                    key={index}
                                    className="text-xs text-muted-foreground flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-green-600 rounded-full"></span>
                                    {insight}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AudienceQuality;
