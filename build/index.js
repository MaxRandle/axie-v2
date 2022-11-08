"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("./queries");
const getRecentTransferRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const recentAxieSales = yield (0, queries_1.getRecentlyAxiesSold)({
        from: 0,
        size: 100,
    });
    const recentTransferRecords = (_a = recentAxieSales.data.data.settledAuctions.axies.results) === null || _a === void 0 ? void 0 : _a.map((axie) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return ({
            txHash: (_b = (_a = axie.transferHistory) === null || _a === void 0 ? void 0 : _a.results) === null || _b === void 0 ? void 0 : _b[0].txHash,
            timestamp: (_d = (_c = axie.transferHistory) === null || _c === void 0 ? void 0 : _c.results) === null || _d === void 0 ? void 0 : _d[0].timestamp,
            withPrice: (_f = (_e = axie.transferHistory) === null || _e === void 0 ? void 0 : _e.results) === null || _f === void 0 ? void 0 : _f[0].withPrice,
            withPriceUsd: (_h = (_g = axie.transferHistory) === null || _g === void 0 ? void 0 : _g.results) === null || _h === void 0 ? void 0 : _h[0].withPriceUsd,
            parts: axie.parts,
            axieId: axie.id,
        });
    });
    return recentTransferRecords;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    //   return await getAxieDetail({ axieId: "512343" });
    const recentTransferRecords = yield getRecentTransferRecords();
    console.log(recentTransferRecords[0].parts);
});
main();
