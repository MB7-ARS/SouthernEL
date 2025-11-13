import React from 'react';
import { PlayerPosition } from '../types';

interface RoleDescription {
    title: string;
    paragraphs: {
        heading: string;
        text: string;
    }[];
}

const roleDescriptionsMap = new Map<PlayerPosition, RoleDescription>([
    [PlayerPosition.GK, {
        title: "Goalkeeper (GK)",
        paragraphs: [
            { heading: "Main Role", text: "The last line of defence. They are responsible for preventing goals, making saves, and commanding the penalty area." },
            { heading: "Modern Responsibilities", text: "Must be excellent with their feet (Sweeper-Keeper). They are the first point of attack, distributing the ball accurately to start the team's build-up play." },
            { heading: "Key Traits", text: "Quick reflexes, strong communication, commanding presence, good passing/kicking range." }
        ]
    }],
    [PlayerPosition.CB, {
        title: "Central Defender (CB)",
        paragraphs: [
            { heading: "Main Role", text: "To stop the central striker(s) from scoring, clear crosses, and provide defensive structure." },
            { heading: "Key Traits", text: "Strength, aerial ability, tackling, and organizational skills. Modern centre-backs must also be comfortable with the ball at their feet (Ball-Playing Defender)." }
        ]
    }],
    [PlayerPosition.LB, {
        title: "Full-Back (LB/RB)",
        paragraphs: [
            { heading: "Main Role", text: "Defend against opposition wingers, prevent crosses, and maintain the width of the defence." },
            { heading: "Modern Role", text: "They are highly active offensively, running the length of the pitch to overlap and provide crosses. This requires huge stamina." }
        ]
    }],
    [PlayerPosition.RB, {
        title: "Full-Back (LB/RB)",
        paragraphs: [
            { heading: "Main Role", text: "Defend against opposition wingers, prevent crosses, and maintain the width of the defence." },
            { heading: "Modern Role", text: "They are highly active offensively, running the length of the pitch to overlap and provide crosses. This requires huge stamina." }
        ]
    }],
    [PlayerPosition.LWB, {
        title: "Wing-Back (LWB/RWB)",
        paragraphs: [
            { heading: "Main Role", text: "A more attacking version of the full-back, typically used in 3- or 5-man defences (e.g., 3-4-3 or 5-3-2)." },
            { heading: "Key Difference", text: "They are expected to provide the entire width of the team's attack and defence, giving them more offensive freedom but also greater defensive responsibility." }
        ]
    }],
    [PlayerPosition.RWB, {
        title: "Wing-Back (LWB/RWB)",
        paragraphs: [
            { heading: "Main Role", text: "A more attacking version of the full-back, typically used in 3- or 5-man defences (e.g., 3-4-3 or 5-3-2)." },
            { heading: "Key Difference", text: "They are expected to provide the entire width of the team's attack and defence, giving them more offensive freedom but also greater defensive responsibility." }
        ]
    }],
    [PlayerPosition.CDM, {
        title: "Defensive Midfielder (CDM)",
        paragraphs: [
            { heading: "Main Role", text: "Sits just in front of the defence, acting as a shield. They break up opposition attacks, intercept passes, and dictate the tempo with simple, safe passing." },
            { heading: "Key Traits", text: "Discipline, positioning, tackling, and excellent passing vision." }
        ]
    }],
    [PlayerPosition.CM, {
        title: "Central Midfielder (CM)",
        paragraphs: [
            { heading: "Main Role", text: "The all-action player. They cover the entire field (box-to-box), contributing equally to defensive duties (winning the ball) and offensive support (carrying the ball and making forward passes)." },
            { heading: "Key Traits", text: "Exceptional stamina, work rate, and technical ability." }
        ]
    }],
    [PlayerPosition.CAM, {
        title: "Attacking Midfielder (CAM)",
        paragraphs: [
            { heading: "Main Role", text: "Operates in the 'hole' behind the striker. They are the creative focal point, responsible for threading incisive passes, setting up chances, and taking long shots." },
            { heading: "Key Traits", text: "Vision, creativity, close control, and technical brilliance." }
        ]
    }],
    [PlayerPosition.LW, {
        title: "Winger (LW/RW)",
        paragraphs: [
            { heading: "Main Role", text: "Traditional wingers provide attacking width, beat their opposing full-back one-on-one, and deliver crosses into the box." },
            { heading: "Modern Role", text: "Often 'inverted,' meaning a right-footed player plays on the left wing (and vice versa) so they can cut inside onto their stronger foot to shoot or pass." }
        ]
    }],
    [PlayerPosition.RW, {
        title: "Winger (LW/RW)",
        paragraphs: [
            { heading: "Main Role", text: "Traditional wingers provide attacking width, beat their opposing full-back one-on-one, and deliver crosses into the box." },
            { heading: "Modern Role", text: "Often 'inverted,' meaning a right-footed player plays on the left wing (and vice versa) so they can cut inside onto their stronger foot to shoot or pass." }
        ]
    }],
    [PlayerPosition.ST, {
        title: "Striker (ST)",
        paragraphs: [
            { heading: "Main Role", text: "The primary goalscorer. They finish chances, hold up the ball for teammates, and provide a central presence in the attacking third." },
            { heading: "Key Traits", text: "Clinical finishing, strength, good movement (getting away from defenders)." }
        ]
    }]
]);

interface RoleExplanationProps {
    position: PlayerPosition;
}

const RoleExplanation: React.FC<RoleExplanationProps> = ({ position }) => {
    const description = roleDescriptionsMap.get(position);

    if (!description) {
        return null;
    }

    return (
        <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-white">Role Explained: {description.title}</h3>
            <div className="space-y-4">
                {description.paragraphs.map((p, index) => (
                    <div key={index}>
                        <h4 className="font-semibold text-lg text-blue-400">{p.heading}</h4>
                        <p className="text-gray-300">{p.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoleExplanation;