import mongoose from "mongoose";
// aggregrate calls
// specific user n how many sales they have made
const AffliateStatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffliateStatSchema);
export default AffiliateStat;
