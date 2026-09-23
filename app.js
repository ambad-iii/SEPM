/* =========================================================
   TRIPEASE - MAIN JAVASCRIPT
   Customer: Anil
========================================================= */


/* =========================================================
   LOCAL STORAGE
========================================================= */

const STORAGE_KEYS = {
    trips: "tripease_trips",
    bookings: "tripease_bookings",
    saved: "tripease_saved",
    budget: "tripease_budget",
    expenses: "tripease_expenses",
    profile: "tripease_profile"
};


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultProfile = {
    name: "Anil",
    email: "anil@gmail.com",
    phone: "+91 9876543210",
    location: "Kerala, India",
    interests: [
        "Nature",
        "Adventure",
        "Food"
    ],
    travelStyle: "Balanced",
    accommodation: "Standard",
    transport: "Flight"
};


/* =========================================================
   STORAGE FUNCTIONS
========================================================= */

function getData(key, defaultValue = []) {

    const data = localStorage.getItem(key);

    if (!data) {
        return defaultValue;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        return defaultValue;
    }
}


function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );
}


/* =========================================================
   INITIALIZE PROFILE
========================================================= */

function initializeProfile() {

    const existing = localStorage.getItem(
        STORAGE_KEYS.profile
    );

    if (!existing) {

        saveData(
            STORAGE_KEYS.profile,
            defaultProfile
        );

    }
}


/* =========================================================
   DASHBOARD
========================================================= */

function loadDashboard() {

    const trips = getData(
        STORAGE_KEYS.trips,
        []
    );

    const bookings = getData(
        STORAGE_KEYS.bookings,
        []
    );

    const saved = getData(
        STORAGE_KEYS.saved,
        []
    );

    const budget = getData(
        STORAGE_KEYS.budget,
        {
            total: 0
        }
    );


    const tripsElement =
        document.getElementById("dashboardTrips");

    const bookingsElement =
        document.getElementById("dashboardBookings");

    const budgetElement =
        document.getElementById("dashboardBudget");

    const savedElement =
        document.getElementById("dashboardSaved");


    if (tripsElement) {

        tripsElement.textContent =
            trips.length;

    }


    if (bookingsElement) {

        bookingsElement.textContent =
            bookings.length;

    }


    if (budgetElement) {

        budgetElement.textContent =
            formatCurrency(budget.total || 0);

    }


    if (savedElement) {

        savedElement.textContent =
            saved.length;

    }


    loadUpcomingTrip(trips);
}


function loadUpcomingTrip(trips) {

    const container =
        document.getElementById("upcomingTrip");

    if (!container) return;


    if (trips.length === 0) {

        return;

    }


    const trip = trips[0];


    container.innerHTML = `

        <div class="trip-card">

            <h3>🌍 ${trip.destination}</h3>

            <p class="trip-info">
                📍 ${trip.location || ""}
            </p>

            <p class="trip-info">
                📅 ${formatDate(trip.startDate)}
                -
                ${formatDate(trip.endDate)}
            </p>

            <p class="trip-info">
                🗓️ ${trip.days} Days •
                ${trip.nights} Nights
            </p>

            <p class="trip-info">
                👥 ${trip.travellers} Travellers
            </p>

            <div class="trip-actions">

                <a
                    href="pages/my-trips.html"
                    class="primary-btn"
                >
                    View Trip
                </a>

            </div>

        </div>

    `;
}


/* =========================================================
   FORMAT CURRENCY
========================================================= */

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(amount || 0);

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date) {

    if (!date) return "-";

    const d = new Date(date);

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   CALCULATE DAYS
========================================================= */

function calculateDays(startDate, endDate) {

    if (!startDate || !endDate) {

        return 0;

    }

    const start =
        new Date(startDate);

    const end =
        new Date(endDate);


    const difference =
        end.getTime() -
        start.getTime();


    if (difference < 0) {

        return 0;

    }


    return Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
    ) + 1;

}


/* =========================================================
   CALCULATE NIGHTS
========================================================= */

function calculateNights(startDate, endDate) {

    const days =
        calculateDays(
            startDate,
            endDate
        );

    return days > 0
        ? days - 1
        : 0;

}


/* =========================================================
   ADD TRIP
========================================================= */

function addTrip(trip) {

    const trips =
        getData(
            STORAGE_KEYS.trips,
            []
        );


    trips.push(trip);


    saveData(
        STORAGE_KEYS.trips,
        trips
    );

}


/* =========================================================
   DELETE TRIP
========================================================= */

function deleteTrip(index) {

    const trips =
        getData(
            STORAGE_KEYS.trips,
            []
        );


    trips.splice(index, 1);


    saveData(
        STORAGE_KEYS.trips,
        trips
    );


    location.reload();

}


/* =========================================================
   ADD BOOKING
========================================================= */

function addBooking(booking) {

    const bookings =
        getData(
            STORAGE_KEYS.bookings,
            []
        );


    bookings.push(booking);


    saveData(
        STORAGE_KEYS.bookings,
        bookings
    );


    alert(
        "Booking added successfully!"
    );

}


/* =========================================================
   DELETE BOOKING
========================================================= */

function deleteBooking(index) {

    const bookings =
        getData(
            STORAGE_KEYS.bookings,
            []
        );


    bookings.splice(index, 1);


    saveData(
        STORAGE_KEYS.bookings,
        bookings
    );


    location.reload();

}


/* =========================================================
   SAVE DESTINATION
========================================================= */

function saveDestination(destination) {

    const saved =
        getData(
            STORAGE_KEYS.saved,
            []
        );


    const exists =
        saved.some(
            item =>
                item.name === destination.name
        );


    if (exists) {

        alert(
            "This destination is already saved."
        );

        return;

    }


    saved.push(destination);


    saveData(
        STORAGE_KEYS.saved,
        saved
    );


    alert(
        destination.name +
        " saved successfully!"
    );

}


/* =========================================================
   REMOVE SAVED DESTINATION
========================================================= */

function removeSavedDestination(index) {

    const saved =
        getData(
            STORAGE_KEYS.saved,
            []
        );


    saved.splice(index, 1);


    saveData(
        STORAGE_KEYS.saved,
        saved
    );


    location.reload();

}


/* =========================================================
   BUDGET
========================================================= */

function calculateBudget() {

    const budget =
        getData(
            STORAGE_KEYS.budget,
            {
                total: 0
            }
        );


    const expenses =
        getData(
            STORAGE_KEYS.expenses,
            []
        );


    let totalSpent = 0;


    expenses.forEach(
        expense => {

            totalSpent +=
                Number(expense.amount);

        }
    );


    const remaining =
        Number(budget.total || 0) -
        totalSpent;


    return {
        total: Number(budget.total || 0),
        spent: totalSpent,
        remaining: remaining
    };

}


/* =========================================================
   SET BUDGET
========================================================= */

function setBudget(amount) {

    saveData(
        STORAGE_KEYS.budget,
        {
            total: Number(amount)
        }
    );

}


/* =========================================================
   ADD EXPENSE
========================================================= */

function addExpense(
    category,
    amount,
    description
) {

    const expenses =
        getData(
            STORAGE_KEYS.expenses,
            []
        );


    expenses.push({

        category: category,

        amount: Number(amount),

        description: description,

        date:
            new Date().toISOString()

    });


    saveData(
        STORAGE_KEYS.expenses,
        expenses
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeProfile();

        loadDashboard();

    }
);