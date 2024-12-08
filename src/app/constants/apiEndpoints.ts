
const API_ENDPOINTS = {
    SIGNUP_API: '/auth/register',
    LOGIN_API: '/auth/login',
    APP_USER_DETAILS_API: '/user/user-details',
    APP_FORGOT_PASSWORD_API: '/auth/forget-password',
    APP_RESET_PASSWORD_API: '/auth/reset-password',
    GET_ALL_USERS_API: '/auth/user/all',

    GET_EVENTS_API: '/app/events/all',
    GET_EVENT_BY_ID: (eventId:string) => `/admin/events/${eventId}/get`,
    GET_EVENTS_BY_SEARCH: (search:string) => `/app/events?search=${search}`,

    EVENT_REGISTRATION_API:'/app/events/register',
    GET_EVENT_ATENDEES_API: (eventId:string) => `/app/events/${eventId}/attendees`,

    GET_REGISTRATIONS_BY_USERID: (userId:string) => `/app/events/registrations/${userId}`,

    SAVE_NOTIFICATION_API: '/notification',
    GET_EMPLOYEE_NOTIFICATION_API: (id:string) => `/notification/${id}`,
    MARK_READ_NOTIFICAITONS_API: (id:string) => `/notification/${id}/emp-read`,

    CREATE_EVENTS_API: (categoryId:string) => `/admin/events/${categoryId}/create`,
    UPDATE_EVENT_BY_ID_ADMIN_API: (eventId:string,categoryId:string|null) => `/admin/events/${eventId}/${categoryId}/update`,
    DELETE_EVENT_BY_ID_ADMIN_API: (eventId:string) => `/admin/events/${eventId}`,
    GET_EVENTS_ADMIN_API: '/admin/events/all',

    GET_ALL_EVENT_REGISTRATIONS_API: '/admin/events/all/registrations',

    GET_EVENT_CATEGORIES_API: '/admin/event-category',
    CREATE_EVENT_CATEGORIES_API: '/admin/event-category',


    MARK_ATTENDANCE_API: (id:string) => `/attendance/mark/${id}`,
    GET_ATTENDANCE_BY_USER_ID_API: (userId:string) => `/attendance/user/${userId}`,
    GET_ATTENDANCE_BY_DATE_API: (date:string) => `/attendance/date/${date}`,
    GET_ATTENDANCE_API: '/attendance/all',

    SUBMIT_FEEDBACK_API: '/feedback/submit',
    GET_FEEDBACK_BY_EVENT_ID_API: (id:string) => `/feedback/event/${id}`
}

export default API_ENDPOINTS