import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "Device",
    "Attacker",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),

    // ===== DEVICE ENDPOINTS =====
    // Get all devices with enhanced filtering and pagination
    getDevice: build.query({
      query: (params = {}) => ({
        url: "device/getAll",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 50,
          status: params.status,
          attackers: params.attackers,
          sortBy: params.sortBy || "last_active",
          sortOrder: params.sortOrder || "desc",
        },
      }),
      providesTags: ["Device"],
    }),

    // Get single device by ID
    getDeviceById: build.query({
      query: (id) => `device/${id}`,
      providesTags: ["Device"],
    }),

    // Add new device
    addDevice: build.mutation({
      query: (device) => ({
        url: "device/create",
        method: "POST",
        body: device,
      }),
      invalidatesTags: ["Device"],
    }),

    // Update existing device
    updateDevice: build.mutation({
      query: ({ id, ...data }) => ({
        url: `device/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Device"],
    }),

    // Delete device
    deleteDevice: build.mutation({
      query: (id) => ({
        url: `device/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Device"],
    }),

    // Mark device as under attack
    markDeviceUnderAttack: build.mutation({
      query: (id) => ({
        url: `device/${id}/mark-attack`,
        method: "PUT",
      }),
      invalidatesTags: ["Device"],
    }),

    // Clear device attack status
    clearDeviceAttackStatus: build.mutation({
      query: (id) => ({
        url: `device/${id}/clear-attack`,
        method: "PUT",
      }),
      invalidatesTags: ["Device"],
    }),

    // Get devices currently under attack
    getDevicesUnderAttack: build.query({
      query: () => "device/under-attack",
      providesTags: ["Device"],
    }),

    // Get device statistics
    getDeviceStatistics: build.query({
      query: () => "device/statistics",
      providesTags: ["Device"],
    }),

    // ===== ATTACK MANAGEMENT BY IP:PORT =====
    // Set single device as under attack by IP and Port
    setAttackerByIpPort: build.mutation({
      query: ({ ip, port }) => ({
        url: "device/set-attacker",
        method: "POST",
        body: { ip, port },
      }),
      invalidatesTags: ["Device"],
    }),

    // Set multiple devices as under attack
    setMultipleAttackersByIpPort: build.mutation({
      query: (targets) => ({
        url: "device/set-multiple-attackers",
        method: "POST",
        body: { targets },
      }),
      invalidatesTags: ["Device"],
    }),

    // Clear attack status by IP and Port
    clearAttackerByIpPort: build.mutation({
      query: ({ ip, port }) => ({
        url: "device/clear-attacker",
        method: "POST",
        body: { ip, port },
      }),
      invalidatesTags: ["Device"],
    }),

    // Toggle attack status by IP and Port
    toggleAttackerByIpPort: build.mutation({
      query: ({ ip, port }) => ({
        url: "device/toggle-attacker",
        method: "POST",
        body: { ip, port },
      }),
      invalidatesTags: ["Device"],
    }),

    // Find device by IP and Port
    findDeviceByIpPort: build.query({
      query: ({ ip, port }) => ({
        url: "device/find",
        method: "GET",
        params: { ip, port },
      }),
      providesTags: ["Device"],
    }),

    // ===== ATTACKER ENDPOINTS =====
    getAllAttackers: build.query({
      query: (params = {}) => ({
        url: "attacker/getAll",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 50,
          status: params.status,
          sortBy: params.sortBy || "latest_attack",
          sortOrder: params.sortOrder || "desc",
        },
      }),
      providesTags: ["Attacker"],
    }),
    getAttackerById: build.query({
      query: (id) => `attacker/${id}`,
      providesTags: ["Attacker"],
    }),
    addAttacker: build.mutation({
      query: (attacker) => ({
        url: "attacker/create",
        method: "POST",
        body: attacker,
      }),
      invalidatesTags: ["Attacker", "Device"], // Also invalidate Device in case it affects device attack status
    }),
    updateAttacker: build.mutation({
      query: ({ id, ...data }) => ({
        url: `attacker/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Attacker"],
    }),
    deleteAttacker: build.mutation({
      query: (id) => ({
        url: `attacker/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attacker"],
    }),

    // Get attacker statistics
    getAttackerStatistics: build.query({
      query: () => "attacker/statistics",
      providesTags: ["Attacker"],
    }),
  }),
});

export const {
  // User endpoints
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,

  // Device endpoints
  useGetDeviceQuery,
  useGetDeviceByIdQuery,
  useAddDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
  useMarkDeviceUnderAttackMutation,
  useClearDeviceAttackStatusMutation,
  useGetDevicesUnderAttackQuery,
  useGetDeviceStatisticsQuery,

  // Attack management by IP:Port endpoints
  useSetAttackerByIpPortMutation,
  useSetMultipleAttackersByIpPortMutation,
  useClearAttackerByIpPortMutation,
  useToggleAttackerByIpPortMutation,
  useFindDeviceByIpPortQuery,

  // Attacker endpoints
  useGetAllAttackersQuery,
  useGetAttackerByIdQuery,
  useAddAttackerMutation,
  useUpdateAttackerMutation,
  useDeleteAttackerMutation,
  useGetAttackerStatisticsQuery,
} = api;
