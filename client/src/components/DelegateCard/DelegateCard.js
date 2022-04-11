import React from "react";
import "./DelegateCard.scss";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
const DelegateCard = ({
  displayRazorpay,
  data,
  isMahe,
  cashPay,
  isBought,
  userID,
}) => {
  const a = [
    1397, 1388, 1396, 1402, 1781, 1294, 1268, 1288, 1438, 1434, 1415, 1419,
    1211, 1414, 1504, 1349, 1393, 1418, 1372, 1353, 1491, 1493, 1217, 1096,
    1496, 1840, 1853, 1810, 1888, 1802, 1506, 1505, 1787, 2006, 1263, 1383,
    1460, 1611, 1615, 1476, 1342, 1516, 2565, 2144, 1862, 2056, 1266, 1219,
    1757, 1485, 1230, 1254, 1753, 1756, 1228, 1285, 1290, 1297, 1316, 1345,
    1212, 1241, 1243, 1259, 1298, 1351, 1233, 1503, 1225, 2319, 1975, 2350,
    2334, 2330, 2320, 1435, 1236, 1440, 2062, 1800, 1811, 1932, 1919, 1264,
    1269, 1284, 1319, 1356, 1376, 2136, 1590, 7493, 8599, 8608, 1213, 1551,
    1216, 1555, 1566, 1531, 1534, 2129, 1550, 1535, 1558, 1584, 1614, 1464,
    1565, 1469, 1475, 1528, 1593, 1602, 1599, 2518, 4773, 8646, 8672, 1304,
    1330, 1301, 1032, 1902, 1940, 1984, 2121, 2021, 2126, 2116, 1378, 1360,
    1486, 1184, 1846, 1953, 1979, 2040, 1500, 1499, 1532, 1183, 1711, 1525,
    1286, 1323, 1346, 1344, 1340, 1387, 1989, 1425, 1403, 1413, 1336, 1343,
    1347, 1218, 1370, 1578, 1947, 2111, 1996, 1997, 2289, 2267, 4999, 2102,
    1251, 1437, 1494, 1427, 1238, 1896, 1943, 1908, 1916, 1841, 1861, 1921,
    1938, 1854, 6, 13, 1000, 159, 1, 7, 1220, 1257, 1262, 1283, 1296, 1379,
    1314, 1287, 1426, 1341, 1803, 1954, 1967, 1991, 1807, 1515, 1538, 8471,
    3471, 8505, 2144, 1780, 8656, 8658, 8668, 1365, 8660, 3213, 7978, 15588,
    15665, 3892, 3872, 1920, 7583, 5814, 5819, 7096, 5822, 7506, 7435, 2561,
    7766, 7282, 1816, 7848, 6949, 7849, 7775, 5837, 7791, 7790, 4458, 7863,
    7011, 6293, 7349, 7859, 7865, 7871, 6001, 7867, 7878, 3995, 6758, 7833,
    2132, 6450, 2150, 7929, 7941, 7944, 7946, 1726, 1031, 7908, 15840, 4134,
    15658, 7242, 8055, 8693, 5919, 15556,
  ];

  const [bought, setBought] = useState(isBought);
  const auth = useAuth();
  const cardPrice =
    isMahe === 1
      ? data.mitPrice
      : isMahe === 2
      ? data.mahePrice
      : data.nonMahePrice;
  return (
    data.isActive &&
    cardPrice >= 0 && (
      <div
        className={`del-card card-up m-1 ${data.type.toLowerCase()} font-medium`}
      >
        <div className="del-content">
          <div>
            <p className="del-type">{data.type}</p>
            <h1 className="text-white">
              {data.name}
              {bought === 1 ? (
                <span style={{ color: "white" }}>
                  <i className="fa fa-check-circle mx-2"></i>
                </span>
              ) : (
                bought === 2 && (
                  <span style={{ color: "white" }}>
                    <i className="fa fa-clock-o mx-2"></i>
                  </span>
                )
              )}
            </h1>
          </div>
          <div className="blank"></div>
          <div className={`price ${bought && "bought"}`}>
            {(data.type === "PROSHOW" && a.includes(userID)) ||
            data.type !== "PROSHOW" ? (
              <div className="clg px-1">
                {cardPrice === 0 ? <p>FREE</p> : <p>&#x20B9;{cardPrice}</p>}
                {bought === 1 ? (
                  <button disabled={true}>Purchased</button>
                ) : bought === 2 && cardPrice !== 0 ? (
                  <>
                    <button disabled={true}>
                      Pay via cash at the nearest Infodesk
                    </button>
                    <button
                      disabled={false}
                      onClick={() =>
                        displayRazorpay(data._id, cardPrice, auth.user)
                      }
                    >
                      Pay Online
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      disabled={bought}
                      onClick={async () => {
                        const d = await cashPay(data._id, cardPrice);
                        if (d.status === 200 && cardPrice === 0) setBought(1);
                        else if (d.status === 200) setBought(2);
                      }}
                    >
                      {cardPrice === 0 ? "Buy Now" : "Pay via Cash"}
                    </button>{" "}
                    {cardPrice !== 0 && (
                      <button
                        disabled={bought}
                        onClick={() =>
                          displayRazorpay(data._id, cardPrice, auth.user)
                        }
                      >
                        Pay Online
                      </button>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="clg px-1">
                {cardPrice === 0 ? <p>FREE</p> : <p>&#x20B9;{cardPrice}</p>}
                <br></br>
                <br></br>
                <button disabled={true}>
                  {isBought == 1
                    ? "Purchased"
                    : "Phase 2 ticket sale starts soon !!"}
                </button>
              </div>
            )}
          </div>
          <div className="blank"></div>
        </div>
      </div>
    )
  );
};

export default DelegateCard;
