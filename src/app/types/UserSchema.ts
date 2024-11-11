import {z} from 'zod';

const UserSchema = z.object({
    name: z.string().min(2,"השם חייב להיות לפחות 2 תווים"),
    email: z.string().email("כתובת אימייל לא תקינה"),
    age: z.number().min(18,"הגיל חייב להיות לפחות 18"),
    isAdmin: z.boolean().optional(),
});
 export default UserSchema;