import { spawn } from 'child_process';
import path from 'path';

export async function getMovieRatePrediction(movie_runtime = 0, movie_revenue = 0) {
    return new Promise((resolve, reject) => {
        const __dirname = import.meta.dirname;
        const scriptPath = path.join(__dirname, '../', 'predict_model', 'model');

        if (movie_runtime === 0 || movie_revenue === 0) {
            resolve(0);
        }

        const pythonProcess = spawn('poetry', ['run', 'python3', 'predict.py', movie_runtime, movie_revenue], {
            cwd: scriptPath,
        });

        pythonProcess.stdout.on('data', (data) => {
            const prediction = data.toString().trim();
            resolve(prediction);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject(data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(`child process exited with code ${code}`);
            }
        });
    });
}