import {Request, Response} from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {
    async create (request: Request, response: Response){
        const trx = await db.transaction();
        
        try {
            const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;
    
            const insertUsersIds = await trx('users').insert({ name, avatar, whatsapp, bio });
    
            const user_id = insertUsersIds[0];
    
            const insertedClassesIds = await trx('classes').insert({ subject, cost, user_id });
    
            const class_id = insertedClassesIds[0];
    
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                };
            });
            
            await trx('class_schedule').insert(classSchedule);
    
            await trx.commit();
    
            return response.status(201).send();
    
        } catch(err) {
            await trx.rollback();
            console.log(err);
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
    async index (request: Request, response: Response){
        const filters = request.query;

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        const timeInMinutes = convertHourToMinutes(time);

        if(!filters.week_day && !filters.subject && !filters.time) {
            const classes = await db('classes')
            .join('users', 'classes.user_id', '=', 'users.id ')
            .select(['classes.*', 'users.*']);

            return response.json(classes);

        } else if(filters.week_day && !filters.subject && !filters.time) {
            const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            })
            .join('users', 'classes.user_id', '=', 'users.id ')
            .select(['classes.*', 'users.*']);

            return response.json(classes); 

        } else if(!filters.week_day && filters.subject && !filters.time) {
            const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id ')
            .select(['classes.*', 'users.*']);

            return response.json(classes); 

        } else if(!filters.week_day && !filters.subject && filters.time) {
            const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .join('users', 'classes.user_id', '=', 'users.id ')
            .select(['classes.*', 'users.*']);

            return response.json(classes); 

        } else if(!filters.week_day && filters.subject && filters.time) {
            const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id ')
            .select(['classes.*', 'users.*']);

            return response.json(classes); 

        } else if(filters.week_day && !filters.subject && filters.time) {
            const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .join('users', 'classes.user_id', '=', 'users.id ')
            .select(['classes.*', 'users.*']);

            return response.json(classes); 

        } else if(filters.week_day && filters.subject && !filters.time) {
            const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id ')
            .select(['classes.*', 'users.*']);

            return response.json(classes); 

        } else if(filters.week_day && filters.subject && filters.time) {
            const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id ')
            .select(['classes.*', 'users.*']);

            return response.json(classes);  
        }        
    }
}