"use client";

import React from "react";

const DataTableSkeleton = () => {
    return (
        <div className="w-full px-5 rounded-xl my-12 animate-pulse">
            {/* Header placeholder */}
            <div className="h-8 bg-gray-300 rounded mb-4 w-1/3"></div>

            {/* Table placeholder */}
            <div className="overflow-auto border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <th key={index} className="px-4 py-2">
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {Array.from({ length: 5 }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: 6 }).map(
                                    (_, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className="px-4 py-2"
                                        >
                                            <div className="h-4 bg-gray-300 rounded"></div>
                                        </td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls placeholder */}
            <div className="mt-4 flex justify-end space-x-2">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-8 w-16 bg-gray-300 rounded"
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default DataTableSkeleton;
