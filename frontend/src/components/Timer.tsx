import { useEffect, useState } from 'react';
import './Timer.css';

interface TimeComponents {
    label: string;
    value: number;
}

export const Timer = () => {
    const [desc, setDesc] = useState<string>(""); 
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);
    const [deadline, setDeadline] = useState<Date | null>(null);

    const monthMap: Record<string, string> = {
        January: '01', February: '02', March: '03', April: '04', 
        May: '05', June: '06', July: '07', August: '08', 
        September: '09', October: '10', November: '11', December: '12'
    };

    const parseDeadline = (month: string, date: string, year: string): Date => {
        let monthNum: string;

        // Check if month is a number or name
        if (isNaN(Number(month))) {
            monthNum = monthMap[month] || '01'; 
        } else {
            monthNum = month.padStart(2, '0'); 
        }

        const day = date.padStart(2, '0'); 

        return new Date(`${year}-${monthNum}-${day}`);
    };

    useEffect(() => {
        const fetchDeadline = async () => {
            try {
                const response = await fetch("https://back.dhruvpatel13210.workers.dev/api/v1/desc");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const { month, date, year, description } = data.data;
                const deadlineDate = parseDeadline(month, date, year);
                setDeadline(deadlineDate);
                setDesc(description);
            } catch (error) {
                console.error('Error fetching deadline:', error);
            }
        };

        fetchDeadline();
    }, []);

    const getTime = (): void => {
        if (!deadline) return; //to avoid null deadline in type check
        console.log(deadline);
        const time = deadline.getTime() - Date.now();
        if (time > 0) {
            setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
            setMins(Math.floor((time / 1000 / 60) % 60));
            setSecs(Math.floor((time / 1000) % 60));
        } else {
            setDays(0);
            setHours(0);
            setMins(0);
            setSecs(0);
        }
    };

    useEffect(() => {
        getTime(); 
        const interval = setInterval(getTime, 1000);
        return () => clearInterval(interval);
    }, [deadline]);

    const timeComponents: TimeComponents[] = [
        { label: 'Days', value: days },
        { label: 'Hours', value: hours },
        { label: 'Mins', value: mins },
        { label: 'Secs', value: secs },
    ];

    return (
        <div>
        <div className="w-screen flex flex-col justify-around bg-gradient-to-bl from-gray-800 to-gray-900 rounded-lg">
            <div className="bg-gray-700 p-6 flex justify-center">
                {timeComponents.map((time, index) => (
                    <div key={index} className="text-center mx-2 flex items-center space-x-2">
                        <div className="text-4xl sm:text-6xl text-white animate-scrollDown">
                            {time.value < 10 ? '0' + time.value : time.value}
                        </div>
                        <div className="text-lg sm:text-xl text-gray-300">
                            {time.label}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h1 className='font-bold p-4 text-center' > Details of the Event </h1>
                <h2 className=' font-bold p-4'>{desc}</h2>
            </div>
        </div>
        </div>
    );
};