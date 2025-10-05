import { store } from '../store.js';

let allOrders = [];
let allMenuItems = [];
let allReservations = [];

function processSalesData() {
    const salesByDate = {};
    allOrders.forEach(order => {
        const date = new Date(order.date).toLocaleDateString();
        if (!salesByDate[date]) {
            salesByDate[date] = 0;
        }
        salesByDate[date] += order.total;
    });

    const sortedDates = Object.keys(salesByDate).sort((a, b) => new Date(a) - new Date(b));
    const labels = sortedDates;
    const data = sortedDates.map(date => salesByDate[date]);

    return { labels, data };
}

function processPopularItemsData() {
    const itemCounts = {};
    allOrders.forEach(order => {
        order.items.forEach(item => {
            if (!itemCounts[item.name]) {
                itemCounts[item.name] = 0;
            }
            itemCounts[item.name] += item.quantity;
        });
    });

    const sortedItems = Object.entries(itemCounts).sort(([, a], [, b]) => b - a).slice(0, 5);
    const labels = sortedItems.map(([name]) => name);
    const data = sortedItems.map(([, count]) => count);

    return { labels, data };
}

function processReservationData() {
    const reservationsByDay = {};
    allReservations.forEach(res => {
        const day = new Date(res.date).toLocaleDateString('en-US', { weekday: 'long' });
        if (!reservationsByDay[day]) {
            reservationsByDay[day] = 0;
        }
        reservationsByDay[day] += res.guests;
    });

    const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const data = labels.map(day => reservationsByDay[day] || 0);

    return { labels, data };
}

function renderSalesChart(salesData) {
    const ctx = document.getElementById('sales-chart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.labels,
            datasets: [{
                label: 'Sales',
                data: salesData.data,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            }]
        }
    });
}

function renderPopularItemsChart(popularItemsData) {
    const ctx = document.getElementById('popular-items-chart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: popularItemsData.labels,
            datasets: [{
                label: 'Items Sold',
                data: popularItemsData.data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }]
        }
    });
}

function renderReservationsChart(reservationData) {
    const ctx = document.getElementById('reservations-chart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: reservationData.labels,
            datasets: [{
                label: 'Guests by Day',
                data: reservationData.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(99, 255, 132, 0.6)'
                ],
            }]
        }
    });
}

export async function initAnalyticsPage() {
    if (!document.getElementById('analytics-page')) return;

    const currentUser = store.getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    [allOrders, allMenuItems, allReservations] = await Promise.all([
        store.getOrders(),
        store.getMenu(),
        store.getReservations()
    ]);

    const salesData = processSalesData();
    const popularItemsData = processPopularItemsData();
    const reservationData = processReservationData();

    renderSalesChart(salesData);
    renderPopularItemsChart(popularItemsData);
    renderReservationsChart(reservationData);
}
