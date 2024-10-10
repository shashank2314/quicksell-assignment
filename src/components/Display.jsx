import React from "react";
import Card from "./Card";
import AddIcon from "../assets/add.svg";
import dotIcon from "../assets/3 dot menu.svg";
import { useState } from "react";

import P3 from "../assets/Img - High Priority.svg";
import P2 from "../assets/Img - Medium Priority.svg";
import P1 from "../assets/Img - Low Priority.svg";
import P0 from "../assets/No-priority.svg";
import P4 from "../assets/SVG - Urgent Priority colour.svg";

import S0 from "../assets/Backlog.svg";
import S1 from "../assets/To-do.svg";
import S2 from "../assets/in-progress.svg";
import S3 from "../assets/Done.svg";
import S4 from "../assets/Cancelled.svg";

const Display = ({ tickets, users, groupBy, orderBy }) => {
  const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((acc, ticket) => {
      const key = ticket[groupBy] || "0";
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});
  };
  const sortTickets = (groupedTickets, sortBy) => {
    for (let group in groupedTickets) {
      groupedTickets[group].sort((a, b) => {
        if (orderBy === "priority") return b.priority - a.priority;
        if (orderBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
    }
    return groupedTickets;
  };
  const related_user = (userId) => {
    return users.filter((u) => u.id == userId);
  };
  const groupedTickets = groupTickets(tickets, groupBy);
  const orderedGroupedTickets = sortTickets(groupedTickets, orderBy);
  
  return (
    <div>
      <div className="Display">
        {Object.keys(orderedGroupedTickets).map((orderkey, index) => (
          <div key={index} className="Display-Horizon">
            <div className="Display2">
              <div className="Display1">
                <div>
                  {groupBy == "status" && (
                    <img
                      src={
                        groupBy == "status" &&
                        (orderkey == "Todo"
                          ? S1
                          : orderkey == "In Progress"
                          ? S2
                          : orderkey == "Backlog"
                          ? S0
                          : orderkey == "Done"
                          ? S3
                          : S4)
                      }
                      className="imagDisp1"
                    />
                  )}
                  {groupBy == "priority" && (
                    <img
                      src={
                        groupBy == "priority" &&
                        (orderkey == 1
                          ? P1
                          : orderkey == 2
                          ? P2
                          : orderkey == 3
                          ? P3
                          : orderkey == 4
                          ? P4
                          : P0)
                      }
                      className="imagDisp1"
                    />
                  )}

                  {groupBy == "userId" && (
                    <img
                      src={
                        groupBy == "userId" &&
                        `https://api.dicebear.com/5.x/initials/svg?seed=${
                          related_user(
                            orderedGroupedTickets[orderkey][0].userId
                          )[0].name
                        }`
                      }
                      className="imagDisp"
                    />
                  )}
                </div>
                <h2>
                  {groupBy == "userId"
                    ? related_user(orderkey)?.[0]?.name
                    : orderkey}{" "}
                </h2>
                <div className="DisplayNum">
                  {orderedGroupedTickets[orderkey].length}
                </div>
              </div>
              <div className="Display1">
                <img src={AddIcon} alt="AddIcon" className="imagDisp1" />
                <img src={dotIcon} alt="dotIcon" className="imagDisp1" />
              </div>
            </div>

            {orderedGroupedTickets[orderkey].map((ticket) => (
              <Card
                key={ticket?.id}
                ticket={ticket}
                user={related_user(ticket?.userId)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
