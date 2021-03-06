import Swal from "sweetalert2";
import backgroundSwal from "../../assets/all_star_sweet.jpg";

export const resultAlert = (status) => {
  return Swal.fire({
    title: status,
    width: 600,
    padding: "3em",
    color: "#FFF",
    background: `linear-gradient(rgba(4,9,30,0.7), rgba(4,9,30,0.7)), url(${backgroundSwal})`,
    backdrop: `
    rgba(167, 167, 167, 0.432)
          left top
          no-repeat
        `,
  });
};

export const confirmationtAlert = () => {
  return Swal.fire({
    title: "Are you sure to reset game?",
    color: "#fff",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#224ead",
    confirmButtonText: "Reset",
    background: `linear-gradient(rgba(4,9,30,0.5), rgba(4,9,30,0.5)), url(${backgroundSwal})`,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      Swal.fire({
        title: "Battle data has been reset",
        background: `linear-gradient(rgba(4,9,30,0.5), rgba(4,9,30,0.5)), url(${backgroundSwal})`,
        color: "#fff",
      });
    }
  });
};
