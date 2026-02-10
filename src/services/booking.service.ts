import api from './api';

export const bookingService = {
    holdSeats: async (departureId: number, data: {
        adult_count: number;
        child_count: number;
        infant_count: number;
        hold_duration?: number;
    }) => {
        return api.post(`/tours/departures/${departureId}/hold`, data);
    },

    // Example general booking endpoint if exists, matching doc
    getBookings: async (params?: any) => {
        return api.get('/tours/bookings', { params });
    }
};
